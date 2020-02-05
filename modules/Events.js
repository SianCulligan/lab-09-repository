'use strict';

const superagent = require('superagent');


function eventfulHandler(request, response) {
  const {search_query} = request.query;
  let url = `http://api.eventful.com/json/events/search?location=${search_query}&app_key=${process.env.EVENTFUL_API_KEY}`;
  superagent.get(url)
    .then(data => {
      let eventfulData = JSON.parse(data.text).events.event;
      console.log(eventfulData);
      const eventsArr = eventfulData.map(value => new Event(value));
      response.send(eventsArr);
    });
}

function Event(object) {
  this.link = object.url;
  this.name = object.title;
  this.event_date = object.start_time;
  this.summary = object.description;
}

module.exports = eventfulHandler;
