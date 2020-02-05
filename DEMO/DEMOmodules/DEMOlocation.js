'use strict'
//moved at4:31


const superagent = require('superagent');
const client = require('./DEMOdata/DEMOClient.js.js');



function locationHandler (req, res) {
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;
  let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;

  let SQL = 'SELECT * FROM locations WHERE search_query = $1';
  let values = [city];

  clientquery(SQL, values)
    .then(results => {
      if (results.rowCount >= 1){
        res.status(200).json(results.rows[0]);
      }
      else {
        return superagent.get(url)
          .then(result => {
            let record = result.body[0];
            let location = new Location(city, record);

            let SQL = `
                    INSERT INTO locations
                        (search_query, formatted_query, latitude, longitude) 
                        VALUES ($1, $2, $3, $4)
                    `;
            let values = [city, location.formatted_query, location.latitude, location.longitude];

            return client.query(SQL, values)
              .then(()=> {
                res.status(200).json(location);
              })})}
    })
    .catch(console.error);
}

function checkDatabaseForLocation {};

function fetchLocation {};

function saveLocationToDatabase {};

function Location (city, data) {
    this.latitude = data.lat;
    this.longitude = data.lon;
    this.formatted_query = data.display_name; 
    this.search_query = city;
};

module.exports = //check 4:30ish
