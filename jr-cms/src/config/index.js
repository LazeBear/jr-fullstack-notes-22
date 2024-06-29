require('dotenv').config();

const optionalConfigs = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

const requiredConfigs = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};

for (const key in requiredConfigs) {
  // null and undefined
  if (requiredConfigs[key] == null) {
    throw new Error(`Missing value for environment variable ${key}`);
  }
}

module.exports = {
  ...optionalConfigs,
  ...requiredConfigs,
};
