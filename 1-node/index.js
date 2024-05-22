console.log('hello world');

setTimeout();

// module
// ES Module
// a.js
// export function add(){};
// // b.js
// import {add} from './a';

// CommonJS Module
// a.js
module.exports = { add };
module.exports = function () {};
// b.js
const { add } = require('./a');

// module.exports.add = function(){};
// exports.add = add;
// exports = {add}; x don't write like this
