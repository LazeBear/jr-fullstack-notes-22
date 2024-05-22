const http = require('http');
const fs = require('fs');
const path = require('path');

// const notes = [];

const server = http.createServer((req, res) => {
  // http request -> method: GET
  // method: POST  localhost:3000

  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // parse - JSON -> JS object
      // stringify - JS object -> JSON
      const data = JSON.parse(body);

      console.log(data);
    });

    // cmd + shift + P
    // window: ctr + shift + P
  }

  // localhost:3000
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'home.html'), (err, data) => {
      if (err) throw err;
      res.end(data);
    });
    return;
  }
  if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'about.html'), (err, data) => {
      if (err) throw err;
      res.end(data);
    });
    return;
  }
  res.end('[1, 2, 3, 4]');
});

// 端口 -》 端口
server.listen(3000);

// JSON parse/stringify
// JavaScript Object Notation

// {name:"mason", age: undefined}
// {"name":"mason"}
// undefined -> null
// {"name": "mason",}
