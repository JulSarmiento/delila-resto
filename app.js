require('dotenv').config();

const YAML = require('yamljs');

const express = require('express');
const {key} = require("./config/jwt");

const swaggerUi = require('swagger-ui-express');
const app = express();

app.set('key', key)

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(YAML.load('./spec.yml')));

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/v1', require('./src/routes/v1.routes'));

app.use(require('./src/middlewares/error'));

/**
 * Health check endpoint
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
app.get('/', (request, response) => {
  const swagger = `${request.protocol}://${request.headers.host}/swagger`;
  const {name, version, author, description, license, keywords} = require('./package.json');

  response.json({name, version, author, description, license, keywords, swagger})
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`
     ______
    |      |
  __|__    |___
 |     |       |
 |     |       |
 |     \\       |
 |__|\\__\\   ___|
    |      |
    |______|
    
    Init app in ${app.settings.env} mode
 `);
});
