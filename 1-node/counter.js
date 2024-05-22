// IIFE
// Immediately invoked function expression

// const moduleA = { exports: {} };
// (function (module) {
let count = 0;

function increment() {
  count++;
}

function getCount() {
  return count;
}

module.exports = { increment, getCount };
// })(moduleA);

// moduleA.exports.increment();
// moduleA.exports.increment();
// moduleA.exports.increment();
// moduleA.exports.increment();
// console.log(moduleA.exports.getCount());

// console.log(__filename, __dirname);
