'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parceiro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parceiro.init({
    id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true,
    },
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parceiro',
  });
  return Parceiro;
};