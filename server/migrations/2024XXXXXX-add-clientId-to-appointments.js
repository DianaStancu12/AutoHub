'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Appointments', 'clientId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Appointments', 'provider', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Appointments', 'clientId');
    await queryInterface.removeColumn('Appointments', 'provider');
  }
};
