const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

// use path.resolve() for creoss-platform purpose
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Looks like you didn't find a static file.`);
});

http.createServer(app).listen(3000, () => {
  console.log('Listening on port 3000...');
});
