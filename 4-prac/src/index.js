require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const v1Router = require('./routes');
// const cors = require('./middleware/cors');
const notFoundError = require('./middleware/error/notFoundError');
const unknownError = require('./middleware/error/unknownError');
const createLogger = require('./utils/logger');
const morgan = require('./utils/morgan');
const swaggerJsDoc = require('./utils/swagger');
const logger = createLogger(__filename);
// const router = require('./routes/index');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(morgan('tiny'));
app.use(morgan);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
app.use('/v1', v1Router);

app.use(notFoundError);
app.use(unknownError);

app.listen(PORT, () => {
  logger.info(`server listerning at port ${PORT}`);
});
