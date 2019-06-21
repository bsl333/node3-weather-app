const request = require('request');

const {
  DARK_SKY_BASE_URL,
  DARK_SKY_API_KEY,
} = process.env;

const fetchWeather = (lat, long, cb) => {
  request.get(`${DARK_SKY_BASE_URL}/${DARK_SKY_API_KEY}/${lat},${long}`, { json: true }, (err, { body }) => {
    if (err) {
      cb('error: ' + err)
    } else if (body.error) {
      cb(body.error)
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary } = body.hourly;
      cb(undefined, { temperature, precipProbability, summary })
    }
  });
};

module.exports = fetchWeather;