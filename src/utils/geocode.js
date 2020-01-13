const request = require("request");

const keys = require("./key");

const geocode = (cityName, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    cityName
  )}.json?access_token=${keys.maps}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("could not connect friend", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find that city, please try again", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lng: body.features[0].center[0],
        cityName: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
