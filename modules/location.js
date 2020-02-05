'use strict';

const superagent = require('superagent');
const client = require('./Client.js');

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

// client.connect();
module.exports = locationHandler;
