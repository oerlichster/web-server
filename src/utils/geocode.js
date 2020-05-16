const request = require("request");

const geocode = (pAddress, pCallBackFunc) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(pAddress) +
    ".json?access_token=pk.eyJ1Ijoib2RpeWFlIiwiYSI6ImNrNXBwOGIxYTB4cDQzbW5zOGlrbWdkdjQifQ.u3Re5895TSsvCikfvBDKRA&limit=1";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      pCallBackFunc("Unable to connect to location services", undefined);
    } else if (body.features.length == 0) {
      pCallBackFunc("Invalid location", undefined);
    } else {
      const coords = body.features[0].center;
      const location = body.features[0].place_name;
      pCallBackFunc(undefined, { lat: coords[1], long: coords[0], location });
    }
  });
};

module.exports = geocode;
