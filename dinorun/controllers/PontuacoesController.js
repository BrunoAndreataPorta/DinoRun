const express = require('express');
const Usuario = require('../models/usuario');
const Partida = require('../models/partida');

exports.getAll = (req, res, next) => {
    Partida.findAll()
    .then(partidas => {
        // Cria uma array de promessas onde cada uma busca um usuário pelo ID do usuário associado à partida
        const promises = partidas.map(partida => {
            return Usuario.findByPk(partida.userId)
                .then(usuario => {
                    partida.usuario = usuario; 
                    return partida;
                });
        });
        // Retorna quando todas as promessas do array forem resolvidas
        return Promise.all(promises);
    })
    .then(partidasComUsuarios => {
        res.render('pontuacoes/index', { partidas: partidasComUsuarios });
    })
};

