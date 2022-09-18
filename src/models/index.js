const Sequelize = require('sequelize');
const { resolve } = require('path');
const config = require(resolve('config.app.js'));

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
  dialect: config.database.dialect,
  dialectOptions: { host: config.database.host, port: config.database.port },
  host: { beforeDefine: (column, model) => (model.tableName = `tbl_${model.name.plural}`) },
  logging: false,
});

module.exports = {
  Sequelize,
  sequelize,
  Todo: require('./todo.models')(sequelize, Sequelize),
  Activity: require('./activity.models')(sequelize, Sequelize),
};
