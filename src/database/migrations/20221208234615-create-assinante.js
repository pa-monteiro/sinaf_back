'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assinantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assinante_id: {
        type: Sequelize.INTEGER
      },
      contrato_id: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      numero_dependentes: {
        type: Sequelize.INTEGER
      },
      data_nascimento: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.ENUM,
        values: ['confirmado','cancelado','pendente']
      },
      primeiro_acesso: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Assinantes');
  }
};