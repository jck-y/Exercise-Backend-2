const http = require('http');
const members = require('./members');
const user = require('./user'); 
const moment = require('moment');

const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the home page');
    res.end();
  } else if (path === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const response = {
      status: 'success',
      message: 'response success',
      description: 'Exercise #03',
      date: moment().format(),
      // data: members 
      
    };
    res.write(JSON.stringify(response));
    res.end();
  } 
  else if (path === "/user") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const response = {
      data: user 
    };
    res.write(JSON.stringify(response));
    res.end();
  }
});

const port = 3000;
const hostname="127.0.0.1";
server.listen(port, hostname, () => {
  console.log(`Server berjalan di: http://${hostname}:${port}/`);
});
