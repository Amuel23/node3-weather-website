const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=abd984c44ead760798610f93db67211c&query=" +
    long +
    "," +
    lat +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to get info`, undefined);
    } else if (body.error) {
      callback(`unable to find loc`, undefined);
    } else {
      callback(undefined, {
        location: body.location.name,
        temperature: body.current.temperature,
        weather_description: body.current.weather_descriptions,
      });
    }
  });
};

module.exports = forecast;
