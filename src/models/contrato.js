'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contrato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Parceiro, {
        foreignKey: 'id',
        as: 'parceiro',
      });

    //   Contrato.belongsTo(models.Assinante, { foreignKey: 'id', as: 'contrato'});
    }
  }
  Contrato.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
     },
    parceiro_id: DataTypes.INTEGER,
    arquivo: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'Contrato',
  });
  return Contrato;
};