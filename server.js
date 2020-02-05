'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const pg = require('pg');

// const PORT = process.env.PORT;
const app = express();
app.use(cors());

//Xrun npm init
//Xrun npm install w/ express, cors, superagent, pg, dotenv

// const client = require('./modules/Client.js');
const locationHandler = require('./modules/Location.js');
const weatherHandler = require('./modules/Weather.js');
const eventfulHandler = require('./modules/Events.js');
const movieHandler= require('./modules/Movies.js');
const yelpHandler = require('./modules/Yelp.js');
// const trailHandler = require('./modules/Trail.js');

//list out routes...
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventfulHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);
// app.get('/trails', trailHandler);

function startServer() {
  app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
