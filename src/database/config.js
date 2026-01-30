const Sequelize = require('sequelize');
const path = require('path');

// Detect environment
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

let sequelize;

if (isProduction && databaseUrl) {
    // Production: Use PostgreSQL from Render
    console.log('🐘 Using PostgreSQL database (production)');
    sequelize = new Sequelize(databaseUrl, {
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
} else {
    // Development: Use SQLite
    console.log('💾 Using SQLite database (development)');
    const dbPath = path.resolve(__dirname, 'uniendom.sqlite');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false
    });
}

module.exports = sequelize;
