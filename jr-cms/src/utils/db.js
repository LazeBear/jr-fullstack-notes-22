const mongoose = require('mongoose');
const config = require('../config');
const createLogger = require('./logger');
const logger = createLogger(__filename);

const connectToDB = async () => {
  const db = mongoose.connection;

  db.on('error', (error) => {
    logger.error(error);
    process.exit(1);
  });

  db.on('connected', () => {
    logger.info('DB connected');
  });

  db.on('disconnected', () => {
    logger.warn('DB disconnected');
  });

  return mongoose.connect(config.DB_CONNECTION_STRING);
};

module.exports = connectToDB;
