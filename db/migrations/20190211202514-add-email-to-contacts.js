'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return sequelize.addColumn('Contacts', 'Email', sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
   return sequelize.removeColumn('Contacts', 'Email');
  }
};
