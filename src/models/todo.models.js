module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    'todo',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      activityGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.ENUM(['1', '0']),
        default: '1',
        allowNull: false,
      },
      priority: {
        type: Sequelize.ENUM(['very-high', 'high']),
        default: 'very-high',
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );

  return Todo;
};
