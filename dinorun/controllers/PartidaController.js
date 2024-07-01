const express = require('express');
const Partida =  require('../models/partida');
const Usuario = require('../models/usuario');
const path = require('path');

exports.imagem = (req, res, next) => {
        res.render('partida/index');
};


exports.gameOver = (req, res, next) => {

    const idUsuario = req.session.login.id;
    const pontuacao = req.query.count;

    Partida.create({
        userId: idUsuario,
        pontuacao: pontuacao,
    })
    .then(partida => {
        res.render('partida/gameOver', { partida: partida });
    })
    .catch(error => {
        console.error('Erro ao criar partida:', error);
    });
};
