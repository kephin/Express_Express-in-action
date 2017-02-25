const axios = require('axios');
const round = require('./round');

const forecastAPI = '7e21c173b2ba025101b96f0a9d6fff1a';

const getWeather = (geoInfo) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.darksky.net/forecast/${forecastAPI}/${geoInfo.lat},${geoInfo.lng}`)
      .then(res => {
        const tempFa = res.data.currently.temperature;
        const tempCel = (tempFa - 32) * 5 / 9;
        resolve({
          temp: round.round10(tempCel, -2),
        });
      })
      .catch(error => {
        reject(Error('Unable to fetch weather forecast server!'));
      });
  });
};

module.exports = {
  getWeather,
};
