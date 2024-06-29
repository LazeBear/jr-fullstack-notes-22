const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    res.formatResponse('Missing authorization header', 401);
    return;
  }
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    res.formatResponse('Invalid token format', 401);
    return;
  }
  const payload = verifyToken(token);

  if (!payload) {
    res.formatResponse('Invalid token', 401);
    return;
  }
  req.user = payload;
  next();
};
