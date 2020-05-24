const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c6f2311906d1f60d11c2511bdf5986b3&query='+longitude+','+latitude +'&units=m';

  request({ url, json: true }, (error, { body } = {}) => {
      if(error){
          callback("Unable to connect to weather service", undefined);
      }else if(body.error){
          callback("Unable to find location", undefined);
      }else{
        callback(undefined, "It is currently "+body.current.temperature +
        " degrees out. There is a "+body.current.precip +" chance of rain.");
      }
  }); 
};

module.exports = forecast;