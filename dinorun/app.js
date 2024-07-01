const express = require('express');
const path = require('path');
const session = require('express-session');
const connection = require('./database/database');
const checkLogin = require('./middleware/checkLogin');

//Models
const Usuario = require('./models/usuario');
const Partida = require('./models/partida');



//Import de rotas
const usuarioRoute = require('./routes/usuarioRoute');
const pontuacoesRoute = require('./routes/pontuacoesRoute');
const partidaRoute = require('./routes/partidaRoute');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'dinorun',
    cookie: {
        maxAge: 1200000,
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define o diretório onde as imagens estão armazenadas
app.use('/img', express.static(path.join(__dirname, 'img')));



// Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com sucesso');
    })
    .catch(erro => {
        console.log('Problemas de conexao.');
    });

// Rotas
app.use('/usuarios', usuarioRoute);
app.use('/pontuacoes', pontuacoesRoute);
app.use('/partida', partidaRoute);


app.use('/', checkLogin, (req, res, next) => {
    res.render('index');
});

app.use((req, res, next) => {
    res.render('404');
})

module.exports = app;




