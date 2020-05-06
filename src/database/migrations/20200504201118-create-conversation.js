module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      friend: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      messages: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
      },
      last_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_message_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('conversations');
  },
};
