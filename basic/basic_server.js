const http = require('http');

const port = 3000;

const requestHandler = (req, res) => {
  console.log(`In comes a request to: ${req.url}`);
  res.end('hello world');
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
