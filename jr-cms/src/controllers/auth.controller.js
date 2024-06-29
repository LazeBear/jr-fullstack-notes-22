const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const createLogger = require('../utils/logger');
const { generateToken } = require('../utils/jwt');

const logger = createLogger(__filename);

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // data validation
    const existingUser = await UserModel.findOne({ username }).exec();
    if (existingUser) {
      res.formatResponse(`Username: ${username} already exists`, 409); // conflicts
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();
    res.formatResponse({ username: user.username }, 201);
    // twilio
    // email verification
    // message queue
    // aws sqs
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      res.formatResponse('Incorrect username and password', 401); // Unauthorized
      return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      res.formatResponse('Incorrect username and password', 401); // Unauthorized
      return;
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
      // role: 'admin',
    });
    res.formatResponse({ username: user.username, token });
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  register,
  login,
};
