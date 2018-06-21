const Sequelize = require('sequelize');
const db = require('./sequelize');

const Crib = db.define('crib', {
  userId: Sequelize.STRING,
  title: Sequelize.STRING,
  html: Sequelize.TEXT,
  css:  Sequelize.TEXT,
  js: Sequelize.TEXT,
  head: Sequelize.JSON,
  unique: Sequelize.STRING
});

module.exports = Crib;
