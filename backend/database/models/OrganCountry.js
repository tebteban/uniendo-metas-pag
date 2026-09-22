const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Organ = require('./Organ');

const OrganCountry = sequelize.define('OrganCountry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    organ_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_flag: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    }
});

// Relaciones
Organ.hasMany(OrganCountry, { foreignKey: 'organ_id', as: 'countries' });
OrganCountry.belongsTo(Organ, { foreignKey: 'organ_id', as: 'organ' });

module.exports = OrganCountry;
