/* eslint-disable require-jsdoc */
const fetch = require('node-fetch');

function weatherInfo(url, queryName, city, apiKeyName, apiKeyValue, callback) {
  const params = new URLSearchParams([
    [queryName, city],
    [apiKeyName, apiKeyValue],
  ]);
  const address = url + '?' + params.toString();
  return fetch(address)
      .then((resp) => resp.json())
      .then((json) => callback(null, json))
      .catch((err) => callback(err, null));
}

module.exports = {
  weatherApi: weatherInfo,
};
