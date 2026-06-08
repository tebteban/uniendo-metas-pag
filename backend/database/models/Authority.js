const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Authority = sequelize.define('Authority', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, // e.g., 'Secretario General', 'Presidente'
        allowNull: false
    },
    group: {
        type: DataTypes.STRING, // e.g., 'Coordinación General', 'Prensa', 'Consejo de Seguridad'
        defaultValue: 'General'
    },
    image: {
        type: DataTypes.STRING, // Path to image (filename)
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    order: {
        type: DataTypes.INTEGER, // For display order
        defaultValue: 0
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Authority;
