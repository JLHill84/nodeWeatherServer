const request = require("request");

const keys = require("./key");

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${keys.weather}/${lat},${lng}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.error) {
      callback("unable to find that city", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " The temp is: " +
          body.currently.temperature +
          " degrees, with a " +
          body.daily.data[0].precipProbability * 100 +
          "% chance of " +
          body.daily.data[0].precipType +
          " and " +
          body.daily.data[0].humidity * 100 +
          "% humidity."
      );
    }
  });
};

module.exports = forecast;
