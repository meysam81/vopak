const env = {
  port: process.env.PORT || 5000,
  apiKeyName: process.env.API_KEY_NAME,
  apiKeyValue: process.env.API_KEY_VALUE,
  apiTempUri: process.env.API_TEMP_URI,
  apiTempCitykey: process.env.API_TEMP_CITY_KEY,
  dbUri: process.env.MONGODB_URI,
};

module.exports = env;
