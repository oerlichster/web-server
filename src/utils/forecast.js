const request = require("request");

const forecast = (pLat, pLong, pCallback) => {
  console.log(pLat,pLong);
  const url =
    "https://api.darksky.net/forecast/024fa8228f7e0bdbefb5c9e4d68eb70e/" +
    pLat +
    "," +
    pLong;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      pCallback("Something wrong happened!", undefined);
    } else if (body.error) {
      pCallback("wrong location!", undefined);
    } else {
      const sum = body.daily.data[0].summary;
      const responseString =
        sum +
        " It's currently " +
        body.currently.temperature +
        " degrees outside. There is a " +
        body.currently.precipProbability +
        " % chance of rain.";
      pCallback(undefined, responseString);
    }
  });
};

module.exports = forecast;
