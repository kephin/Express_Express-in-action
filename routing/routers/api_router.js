const express = require('express');

const ALLOWED_IPS = [
  '127.0.0.1',
  '123.456.78.9',
];

const api = express.Router();

api.use((req, res, next) => {
  const userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== '-1';
  if (!userIsAllowed) {
    res.status(401).send('Not authorized!');
  } else {
    next();
  }
});

api.get('/users', (req, res) => {
  res.send('Node rocks!');
});
api.get('/messages', (req, res) => {
  res.send('Express rocks!');
});

module.exports = api;
