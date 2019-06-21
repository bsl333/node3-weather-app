const request = require('request');
const{
  MAP_BOX_BASE_URL,
  MAP_BOX_API_KEY
} = process.env;

const fetchCoordinates = (location, cb) => {
  request.get(`${MAP_BOX_BASE_URL}/${encodeURIComponent(location)}.json?access_token=${MAP_BOX_API_KEY}`, { json: true }, (err, { body }) => {
    if (err) {
      cb(err);
      return
    }
    const { features } = body;
    if (!features || !features.length) {
      cb(`Unable to find location. Please try another search`)
    } else {
      const { place_name: placeName, center: [long, lat] } = features[0];
      cb(undefined, { lat, long, placeName } );
    }
  })
}

module.exports = fetchCoordinates;