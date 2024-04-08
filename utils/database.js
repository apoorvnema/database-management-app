const Sequelize = require('sequelize');

const sequelize = new Sequelize('database-management-app', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;