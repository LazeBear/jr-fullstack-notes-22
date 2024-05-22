const http = require('http');
const fs = require('fs');
const path = require('path');

const notes = [];

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const data = JSON.parse(body);

      notes.push(data);
      fs.writeFile(
        path.join(__dirname, 'notes.json'),
        JSON.stringify(notes),
        { encoding: 'utf-8' },
        (err) => {
          if (err) throw err;
          res.end('note saved successfully');
        }
      );
    });
    return;
  }
  fs.readFile(
    path.join(__dirname, 'notes.json'),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) throw err;
      res.end(data);
    }
  );
});

server.listen(3000);
