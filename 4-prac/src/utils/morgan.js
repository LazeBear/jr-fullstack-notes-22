const morgan = require('morgan');
const createLogger = require('./logger');
const logger = createLogger();

module.exports = morgan(process.env.NODE_ENV === 'dev' ? 'tiny' : 'combined', {
  stream: logger.stream,
});
