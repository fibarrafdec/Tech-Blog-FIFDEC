const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Establish a connection to the database
if (process.env.JAWSDB_URL) {
    // If deployed on Heroku, use the JAWSDB_URL
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Otherwise, use local database credentials
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;
