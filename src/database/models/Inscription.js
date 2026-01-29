const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Inscription = sequelize.define('Inscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING, // 'voluntario', 'escuela', 'autoridad'
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true // Extracted from data if possible
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true // Extracted from data if possible
    },
    data: {
        type: DataTypes.JSON, // Stores the full row data
        allowNull: false
    }
}, {
    tableName: 'inscriptions',
    timestamps: true
});

module.exports = Inscription;
