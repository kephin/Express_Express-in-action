const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// grab data from route: req.params
app.get('/hello/:who', (req, res) => {
  res.end(`hello, ${req.params.who}`);
});

// grab query arguements
app.get('/search', (req, res) => {
  res.end(`hello, ${req.query.name}`);
});

// redirect: res.render
app.post('/users', (req, res) => {
  // save the user info into db
  // then redirect to the homepage
  res.redirect('/');
});

// blocking certain IP: req.ip
const evilIPs = ['123, 456, 78, 9'];

const isEvilIP = (ip, evilIPs) => {
  for (const evilIP of evilIPs) {
    if (ip === evilIP) return true;
  }
  return false;
};

app.use((req, res, next) => {
  if (isEvilIP(req.ip, evilIPs)) {
    res.send(401).send('NOT allowed!');
  } else {
    next();
  }
});

// if none of the up above has been executed
app.use((req, res) => {
  res.status(404).end('404!');
});

http.createServer(app).listen(3000, () => {
  console.log('Listening on port 3000...');
});
