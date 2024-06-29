const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (paylod) => {
  return jwt.sign(paylod, config.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (e) {
    // check error type, log them down
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
