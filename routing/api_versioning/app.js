const express = require('express');

const apiVersion1 = require('./api_1');
const apiVersion2 = require('./api_2');

const app = express();

app.use('/v1', apiVersion1);
app.use('/v2', apiVersion2);

app.listen(3000, () => {
  console.log('The server is up on port 3000...');
});
