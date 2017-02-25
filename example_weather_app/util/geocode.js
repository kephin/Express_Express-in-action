const axios = require('axios');

const getGeocode = (address) => {
  return new Promise((resolve, reject) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
        },
      })
      .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
          reject(Error('Unable to find that address.'));
        } else if (response.data.status === 'OK') {
          const geoInfo = {
            address: response.data.results[0].formatted_address,
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
          };
          resolve(geoInfo);
        }
      })
      .catch(error => {
        reject(Error('Unable to connect to google servers.'));
      });
  });
};

module.exports = {
  getGeocode,
};
