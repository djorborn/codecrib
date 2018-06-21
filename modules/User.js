const Sequelize = require('sequelize');
const db = require('./sequelize');

const User = db.define('user', {
  username: Sequelize.STRING,
  githubId: Sequelize.STRING,
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  settings: Sequelize.JSON,
});

module.exports = User;
