const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.end('Welcome to my homepage!');
});

app.get('/about', (req, res) => {
  res.end('Welcome to the about page!');
});

app.get('/weather', (req, res) => {
  res.end('The current weather is NICE!');
});

// if none of the up above has been executed
app.use((req, res) => {
  res.status(404).end('404!');
});

http.createServer(app).listen(3000, () => {
  console.log('Listening on port 3000...');
});
