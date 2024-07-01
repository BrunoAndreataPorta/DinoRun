const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');
const checkLogin = require('../middleware/checkLogin');

router.get('/login', UsuarioController.renderLogin);
router.post('/login', UsuarioController.login);
router.get('/', checkLogin, UsuarioController.getUser);
router.get('/novo', UsuarioController.renderNovo);
router.post('/', UsuarioController.create);
router.get('/:id', checkLogin, UsuarioController.renderEditar);
router.post('/salvar', checkLogin, UsuarioController.update);
router.get('/delete/:id', checkLogin, UsuarioController.delete);
router.get('/logout/:id', checkLogin, UsuarioController.logout);

module.exports = router;
