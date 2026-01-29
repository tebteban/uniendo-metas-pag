const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING, // text, url, date, image
        defaultValue: 'text'
    }
}, {
    tableName: 'settings',
    timestamps: false
});

module.exports = Setting;
