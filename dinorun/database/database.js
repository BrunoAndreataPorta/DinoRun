const Sequelize = require('sequelize');

const connection = new Sequelize(
    'dinorun', 
    'root', 
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    });

module.exports = connection;