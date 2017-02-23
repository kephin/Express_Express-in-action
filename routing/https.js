const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express.app();

const httpsOptions = {
  key: fs.readFileSync('path/to/private/key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem'),
};

//run both HTTP / HTTPS servers
http.createServer(app).listen(80);
https.createServer(httpsOptions, app).listen(443);
