const Sequelize = require('sequelize');
const connection = require('../database/database');
const Usuario = require('./usuario');

const Partida = connection.define('partida', {
    pontuacao: {
        type: Sequelize.INTEGER,
    },
    userId: { 
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Usuario.hasMany(Partida, { foreignKey: 'userId' });

//Partida.sync({force: true});

module.exports = Partida;


