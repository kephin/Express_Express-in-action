const express = require('express');
const http = require('http');

const port = 3000;
const app = express();

app.use((req, res) => {
  console.log(`In comes a request to: ${req.url}`);
  if (req.url === '/') {
    res.end(('Welcome to the homepage.'));
  } else if (req.url === '/about') {
    res.end('Welcome to the about page.');
  } else {
    res.end('Error! File not found.');
  }
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
