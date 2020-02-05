'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');


const PORT = process.env.PORT;
const app = express();
app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.get('/location', locationHandler);



// see 3:47 for below code ? 
function startServer() {

}


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
  });



