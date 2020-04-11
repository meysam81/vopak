const express = require('express');

// source env file
require('dotenv').config()


const config = require('./config');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('./db');


app = express();
app.use(express.json());
app.use(middleware.logger);

db.initDB();

// include env for routes
app.use((req, res, next) => {
  req.headers['WEATHER-API-URL'] = config.apiTempUri;
  req.headers['WEATHER-API-KEY-NAME'] = config.apiKeyName;
  req.headers['WEATHER-API-KEY-VALUE'] = config.apiKeyValue;
  req.headers['WEATHER-API-CITY-KEY'] = config.apiTempCitykey;
  req.headers['DATABASE'] = db;
  next();
});

app.use(routes);

app.listen(config.port, () => {
  console.log(`Server running on :${config.port}`);
});
