const express = require('express');
const http = require('http');

const port = 3000;
const app = express();

//#1. logging middleware
app.use((req, res, next) => {
  console.log(`In comes a request to: ${req.url}`);
  next();
});

//#2. fake authorization middleware
app.use((req, res, next) => {
  const minute = new Date().getMinutes();
  if (minute % 2 === 0) {
    next();
  } else {
    res.statusCode = 403;
    res.send('Not authorized!');
  }
});

//#3. sending secret info middleware(if authenticated)
app.use((req, res) => {
  res.end('Secret info: The password is #####');
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
