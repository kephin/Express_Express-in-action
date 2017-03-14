const express = require('express');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'test.jpg');

app.use((req, res, next) => {
  res.sendFile(filePath, err => {
    //enter error mode by calling next() with an argument
    if (err) return next(new Error(err));
    console.log('File sent!');
  });
});

//error-handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

//here, we must pass 4 arguments so Express know this is a error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send('Internal server error.');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000...');
});
