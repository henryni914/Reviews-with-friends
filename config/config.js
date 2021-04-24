require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.RDS_USERNAME,
        "password": process.env.RDS_PASSWORD,
        "port": process.env.RDS_PORT,
        "database": process.env.RDS_DATABASE,
        "host": process.env.RDS_HOSTNAME,
        "dialect": "mysql",
        "dialectOptions": {
            ssl: 'Amazon RDS'
        },
        "language": 'en'
    }
};