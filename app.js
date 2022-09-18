const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const routes = require('./src/routes');
const config = require('./config.app');
const db = require('./src/models');

const app = express();
const PORT = config.server.port || 3001;

app.use(cors());
app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.sequelize
  .sync({ force: config.env.development })
  .then(() => {
    app.listen(PORT, () => {
      console.clear();
      console.debug(`[⚡] Server is running ${config.server.host}:${config.server.port}`);
    });
  })
  .catch((err) => {
    console.debug('Error ', err);
  });
