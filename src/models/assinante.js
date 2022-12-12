'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');
const Contrato = require('./contrato');

module.exports = (sequelize, DataTypes) => {
  class Assinante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Contrato);
    }

    generateToken() {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    }
  }
  Assinante.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
     },
    contrato_id: DataTypes.INTEGER,
    assinante_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM,
      values: ['cancelado','confirmado','pendente'],
    },
    numero_dependentes: DataTypes.INTEGER,
    primeiro_acesso: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Assinante',
  });
  
  return Assinante;
};