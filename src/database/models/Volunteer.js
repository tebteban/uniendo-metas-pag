const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Volunteer = sequelize.define('Volunteer', {
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
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING, // Path to image file
        allowNull: true
    },
    category: {
        type: DataTypes.STRING, // 'current_staff', 'legacy_year'
        defaultValue: 'current_staff'
    },
    year: {
        type: DataTypes.INTEGER, // e.g., 2026, 2025
        allowNull: true
    },
    organ: {
        type: DataTypes.STRING, // For specific organs if needed
        allowNull: true
    },
    color_badge: {
        type: DataTypes.STRING, // 'green', 'orange', etc. (for badge styling)
        allowNull: true
    }
});

module.exports = Volunteer;
