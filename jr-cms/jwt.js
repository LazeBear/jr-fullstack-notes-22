const jwt = require('jsonwebtoken');

const secret = 'secret';

const payload = {
  id: 123,
};

// '1h', '1d'
// '15m', '1d', '7d', '30d'
const token = jwt.sign(payload, secret, { expiresIn: 10 });
console.log(token);

// access token - 15m
// refresh token - 30d - 1year

// jwt.sign()
