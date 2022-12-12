'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contrato_produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contrato_produtos.init({
    contrato_id: DataTypes.INTEGER,
    produto_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'contrato_produtos',
  });
  return contrato_produtos;
};