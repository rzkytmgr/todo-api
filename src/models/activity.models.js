module.exports = (sequelize, Sequelize) => {
  const Todo = require('./todo.models')(sequelize, Sequelize);
  const Activity = sequelize.define(
    'activity',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(100),
        default: '',
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );

  Activity.hasMany(Todo, {
    foreignKey: 'activityGroupId',
  });

  return Activity;
};
