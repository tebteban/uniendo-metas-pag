const Sequelize = require('sequelize');
const path = require('path');

// Determinar si estamos en producción o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction && process.env.DATABASE_URL) {
    // Producción: Usar PostgreSQL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
    console.log('🐘 Usando PostgreSQL (Producción)');
} else {
    // Desarrollo: Usar SQLite
    const dbPath = path.resolve(__dirname, 'uniendom.sqlite');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false
    });
    console.log('📁 Usando SQLite (Desarrollo)');
}

module.exports = sequelize;
