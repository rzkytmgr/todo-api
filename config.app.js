require('dotenv').config();

module.exports = {
  database: {
    dialect: 'mysql',
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
  server: {
    host: 'http://localhost',
    port: 3030,
  },
  env: {
    development: false,
  },
};
