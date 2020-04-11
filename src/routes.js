/* eslint-disable require-jsdoc */
const express = require('express');
const moment = require('moment');

const utils = require('./utils');


const routes = new express.Router();

/*
* query the temperature from the API, then save it to DB
*/
function covilhaResponse(db, res, city = 'Covilha') {
  return (err, json) => {
    if (err) {
      console.error(err);
      res.status(417).json({msg: 'Could not fetch.'});
    } else {
      // kelvin to celcius
      const temperature = (json.main.feels_like - 273.15).toFixed(2);

      body = {
        city: city,
        timestamp: moment().format(),
        temperature: temperature,
      };

      // insert to db for future use
      db.insertNewRecord(body);

      // return the result back to the user
      res.json(body);
    };
  };
}

/*
* query the average temperature from July in Sfax
*/
function sfaxResponse(startDate, endDate, res, city = 'Sfax') {
  return (err, docs) => {
    if (err) {
      console.error(err);
      res.status(417).json({msg: 'Could not retrieve.'});
    } else {
      if (docs.length == 0) {
        return res.status(404).json({msg: 'No record found'});
      }
      res.json({
        city,
        startDate,
        endDate,
        averageTemperature: docs[0].avg,
      });
    }
  };
}


routes.get('/currenttempincovilha', (req, res) => {
  // retrieving the temperature directly from API
  const db = req.headers['DATABASE'];
  utils.weatherApi(
      req.headers['WEATHER-API-URL'],
      req.headers['WEATHER-API-CITY-KEY'],
      'Covilha',
      req.headers['WEATHER-API-KEY-NAME'],
      req.headers['WEATHER-API-KEY-VALUE'],
      covilhaResponse(db, res));
});

routes.get('/avgtempinsfax', (req, res) => {
  // refering to database for fetching the average temperature
  const db = req.headers['DATABASE'];
  startDate = moment().month('june').startOf('month').toDate()
  endDate = moment().month('july').startOf('month').toDate()
  db.getAllRecords(
      'Sfax',
      startDate,
      endDate,
      sfaxResponse(startDate, endDate, res),
  );
});

module.exports = routes;
