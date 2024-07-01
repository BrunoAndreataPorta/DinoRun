const express = require('express');
const router = express.Router();

const PartidaController = require('../controllers/PartidaController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, PartidaController.imagem);
router.get('/gameOver', checkLogin, PartidaController.gameOver);


module.exports = router;

