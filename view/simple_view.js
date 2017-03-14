const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hey, this is my website!',
    userList: [{
      profilePicture: 'localPath',
      name: 'kevin',
      bio: 'I love JS',
    }, {
      profilePicture: 'localPath',
      name: 'gigi',
      bio: 'Programming rocks',
    }],
  });
});

http.createServer(app).listen(3000, () => {
  console.log('Listening on port 3000...');
});
