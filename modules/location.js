'use strict';

//we need to move superagent to each module that will make api calls
const superagent = require('superagent');

//This is bringing in an instance of our Client module
const client = require('./Client');

//from the server, this location object will get info from either DB cache or from the insert(after api call)
//and the module exports this object.
//notice at the bottom.  this is what we are exporting.  By envoking getLocaitonData()
const location = {};



function locationHandler(request, response) {
  let city = request.query.city;
  // console.log(request.query);
  let SQL = `SELECT * FROM explorer WHERE city='${city}';`;
  // console.log('this is my SQL', SQL);
  client.query(SQL)
    .then(results => {
      if (results.rows.length > 0) {
        response.send(results.rows[0]);
      } else {
        try {
          let key = process.env.GEOCODE_API_KEY;
          const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
          superagent.get(url)
            .then(data => {
              const geoData = data.body[0];
              const location = new Location(city, geoData);
              const {search_query, formatted_query, latitude, longitude} = location;
              let apiToSql = `INSERT INTO explorer (city, formattedquery, lat, long) VALUES ('${search_query}','${formatted_query}','${latitude}','${longitude}');`;
              client.query(apiToSql);
              response.send(location);
            })
            .catch(() => {
              errorHandler('not today satan.', request, response);
            });
        } catch (error) {
          errorHandler(error, request, response);
        }
      }
    });
// }









function cacheLocation(city, data) {
    const location = new Location(data[0]);
    let SQL = `INSERT INTO locations (search_query, formatted_query, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    let values = [city, location.formatted_query, location.latitude, location.longitude];
    return client.query(SQL, values)
      .then(results => results.rows[0])
  }








function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}


function errorHandler(error, request, response) {
    response.status(500).send(error);
  }
  


module.exports = location;

