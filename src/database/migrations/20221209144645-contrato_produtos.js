'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contrato_produtos', {
      contrato_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      produto_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('contrato_produtos');
  }
};
