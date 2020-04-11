const mongoose = require('mongoose');
const config = require('./config');

const temperatureSchema = new mongoose.Schema({
  city: String,
  timestamp: Date,
  temperature: Number,
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports.initDB = () => {
  mongoose.connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
      .catch((err) => console.error(err));
  return mongoose.connection;
};

module.exports.getAllRecords = (city, startDate, endDate, callback) => {
  Temperature.aggregate([
    {$match: {city: city, timestamp: {$gte: startDate, $lt: endDate}}},
    {$group: {_id: null, avg: {$avg: '$temperature'}}},
  ], callback)
      .catch((err) => console.error(err));
};


module.exports.insertNewRecord = (record, callback) => {
  Temperature.insertMany([record]).then(callback);
};
