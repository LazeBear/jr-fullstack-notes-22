const swaggerJsDoc = require('swagger-jsdoc');

module.exports = swaggerJsDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Todo tasks API',
      version: '0.0.1',
      description: 'some description',
      contact: {
        name: 'mason',
        email: 'mason@example.com',
      },
    },
  },
  apis: ['src/controllers/*.js'],
});

// yml
// yaml
