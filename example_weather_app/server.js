const path = require('path');
const express = require('express');

const geocode = require('./util/geocode');
const weather = require('./util/weather_forecast');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:place', (req, res, next) => {
  const address = req.params.place;
  geocode.getGeocode(address)
    .then(response => weather.getWeather(response))
    .then(response => res.json({
      location: address,
      temp: response.temp,
    }))
    .catch(error => next(new Error(error)));
});

app.use((err, req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server is on at port 3000...');
});
