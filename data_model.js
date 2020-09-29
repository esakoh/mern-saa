const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Datan rakenne
const weather_Schema = new Schema(
  {
    time: {type: 'String'},
    city: {type: 'String'},
    deg: {type: 'String'},
    wind: {type: 'String'}
  
  }
);

const Weather = mongoose.model('Weather', weather_Schema);

module.exports = Weather;