const winston = require('winston');
const path = require('path');

// filename -> __filename
const createLogger = (filename) => {
  const logger = winston.createLogger({
    level: 'info', // test -> 'warning'
    defaultMeta: {
      file: filename ? path.basename(filename) : undefined,
    },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, file, level, message }) => {
        return `[${timestamp}] [${level}] ${
          file ? `[${file}]` : ''
        }: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
      }),
    ],
  });

  logger.stream = {
    write: (message) => {
      logger.info(message);
    },
  };
  return logger;
};

module.exports = createLogger;
