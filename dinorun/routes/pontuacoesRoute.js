const express = require('express');
const router = express.Router();

const PontuacoesController = require('../controllers/PontuacoesController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, PontuacoesController.getAll);

module.exports = router;