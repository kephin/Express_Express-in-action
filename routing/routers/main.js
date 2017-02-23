const express = require('express');
const path = require('path');

const apiRouter = require('./api_router');

const app = express();

const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use('.api', apiRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
