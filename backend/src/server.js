//express é um microframework com funcionalidades prontas para não ter que criar nada do 0
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

//connect to the database
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack.o0hcd.mongodb.net/semana9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};
//anota os usuarios logados na aplicação
io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

//adiciona os usuarios conectados para todas as rotas da aplicação
app.use((req, res, next) => {
    //garante o acesso do io as rotas
    req.io = io;
    //e aos usuarios
    req.connectedUsers = connectedUsers;

    //continua o fluxo da aplicaçao
    return next();
});

// GET(busca informações), POST(cria novas informações), PUT(edita informações), DELETE(oq será?)

//req.query = access query params(filtrar)
//req.params = access route params(p editar e deletar)
//req.body = access request body(p criar e editar)
//req.headers = acces the information about the fetched object

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//da o endereço do local host
server.listen(3333);
