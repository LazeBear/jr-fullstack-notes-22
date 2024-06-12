const config = require('./config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('./utils/morgan');
const rateLimit = require('./utils/rateLimit');
const createLogger = require('./utils/logger');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const unknownErrorMiddleware = require('./middleware/error/unknownError.middleware');
const v1Router = require('./routes');
const connectToDB = require('./utils/db');
const pathNotFoundMiddleware = require('./middleware/pathNotFound.middleware');
const logger = createLogger(__filename);

const app = express();
app.use(helmet());
app.use(rateLimit);
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(formatResponseMiddleware);

app.use('/v1', v1Router);

app.use(pathNotFoundMiddleware);

app.use(unknownErrorMiddleware);

connectToDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT}`);
  });
});
