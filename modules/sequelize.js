const Sequelize = require('sequelize');
const db = new Sequelize('crib', null, null, {
  dialect: 'sqlite',
  storage: 'crib.sqlite',
  operatorsAliases: false,
});

module.exports = db;
