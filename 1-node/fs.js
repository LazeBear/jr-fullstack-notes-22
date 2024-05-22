// fs -> file system

// package, library
// 库

// framework 框架

const fs = require('fs');

fs.readFile('./note.txt', { encoding: 'utf8' }, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});

fs.writeFileSync('./test.txt', 'hello from node fs');

// path package
