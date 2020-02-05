'use strict';

const superagent = require('superagent');


function yelpHandler (city) {
  const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
  //https://www.yelp.com/developers/documentation/v3/business_search
  return superagent.get(url)
    .set(process.env.YELP_API_KEY)
    .then (data =>{
      return (data.body.businesses.map(data =>{
        return new Yelp(data);
      }));
    });
}


function Yelp (data) {
  this.name = data.name;
  this.image_url = data.image_url;
  this.price = data.price;
  this.rating = data.rating;
  this.url = data.url;
}

// client.connect();
module.exports = yelpHandler;
