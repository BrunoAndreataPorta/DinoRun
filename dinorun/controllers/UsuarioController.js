const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

exports.getUser = (req, res, next) => {
    const idUsuarioLogado = req.session.login.id;

    console.log("ID do usuário logado:", idUsuarioLogado);

    // Busca o usuário logado
    Usuario.findByPk(idUsuarioLogado)
    .then(usuario => {
        if (usuario) {
            // Renderiza a página com apenas o usuário logado
            res.render('usuario/index', { usuarios: [usuario] });
        } else {
            // Se não encontrar o usuário, renderiza a página sem nenhum usuário
            res.render('usuario/index', { usuarios: [] });
        }
    }).catch(err => {
        console.error('Erro ao buscar usuário logado:', err);
        res.render('error', { message: 'Erro ao buscar usuário logado', error: err });
    });
};


exports.renderNovo = (req, res, next) => {
    res.render('usuario/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { nome: nome }
            ]
        }
    }).then(usuario => {
        if(usuario == undefined)
        {
            const salt = bcrypt.genSaltSync();
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            Usuario.create({
                nome: nome,
                email: email,
                senha: senhaCriptografada
            }).then(() => {
                res.redirect('/usuarios');
            });
        }
        else
        {
            res.render('usuario/novo', { msg: 'Um usuário com este e-mail ou nome já existe.'});
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Usuario.findByPk(id).then(usuario => {
        res.render('usuario/editar', {usuario: usuario});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    Usuario.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { nome: nome }
            ],
            id: {
                [Op.ne]: id
            }
        }
    }).then(usuarioExistente => {
        if (usuarioExistente === null) {
            Usuario.update({
                nome: nome,
                email: email
            },
            {
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/usuarios');
            });
        }else{
            res.redirect('/usuarios');
        }
    })
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id: id
        }
    }).then(() => {
        req.session.login = undefined
        res.render('login', {msg: ''});    
    })
}

exports.renderLogin = (req, res, next) => {
    res.render('login', {msg: ''});
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if(usuario != undefined)
        {
            const deuCerto = bcrypt.compareSync(senha, usuario.senha);
            if(deuCerto)
            {
                req.session.login = {
                    id: usuario.id,
                    nome: usuario.nome
                }

                res.redirect('/');
            }
            else
            {
                res.render('login', { msg: 'Usuário ou senha inválidos'});
            }
        }
        else
        {
            res.render('login', { msg: 'Usuário ou senha inválidos'});
        }
    })
}


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir sessão:', err);
            return next(err);
        }
        res.redirect('/usuarios/login');
    });
};