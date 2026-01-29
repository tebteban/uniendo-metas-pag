const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Organ = sequelize.define('Organ', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link_reglamento: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Organ;
