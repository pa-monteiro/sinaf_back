'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.contrato = require('../models/contrato')(sequelize, Sequelize);
db.produto = require('../models/produto')(sequelize, Sequelize);
db.assinantes = require('../models/assinante')(sequelize, Sequelize);
db.contrato_produtos = require('../models/contrato_produtos')(sequelize, Sequelize);

db.assinantes.belongsTo(db.contrato, {foreignKey: 'contrato_id', as: 'contrato' });

db.contrato.belongsToMany(db.produto, { through: db.contrato_produtos});
db.produto.belongsToMany(db.contrato, { through: db.contrato_produtos});

module.exports = db;
