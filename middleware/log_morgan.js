const express = require('express');
const logger = require('morgan');
const http = require('http');

const app = express();

app.use(logger('short'));

app.use((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('hello world');
});

app.listen(3000, () => {
  console.log('Listeing on port 3000...');
});
