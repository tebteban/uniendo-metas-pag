const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    day: {
        type: DataTypes.STRING, // 'Viernes', 'Sabado', 'Domingo'
        allowNull: false
    },
    date: {
        type: DataTypes.STRING, // '4 de Octubre'
        allowNull: false
    },
    sort_date: {
        type: DataTypes.DATEONLY, // fecha real para ordenar: '2026-10-04'
        allowNull: true
    },
    time: {
        type: DataTypes.STRING, // '08:00 HS'
        allowNull: false
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING, // 'general', 'academic', 'break' (for color coding)
        defaultValue: 'general'
    }
});

module.exports = Schedule;
