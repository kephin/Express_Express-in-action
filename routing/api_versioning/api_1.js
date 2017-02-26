const express = require('express');

const api = express.Router();

api.get('/:place', (req, res) => {
  res.json({
    place: req.params.place,
  });
});

module.exports = api;
