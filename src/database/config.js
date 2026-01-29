const Sequelize = require('sequelize');
const path = require('path');

const dbPath = path.resolve(__dirname, 'uniendom.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false // Set to console.log to see SQL queries
});

module.exports = sequelize;
