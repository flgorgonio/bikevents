let express = require('express');
let app = express();
const EventoDB = require('./EventoDB');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("API Calendário de Eventos Ciclísticos");
});

app.get('/eventos', function (req, res) {
    EventoDB.getEventos(function (eventos) {
        res.json(eventos);        
    });
});

app.get('/eventos/:id(\\d+)', function (req, res) {
    let id = req.params.id;
    EventoDB.getEventosById(id, function (evento) {
        res.json(evento);
    });
});

app.delete('/eventos/:id(\\d+)', function (req, res) {
    let id = req.params.id;
    console.log("Apagar evento " + id);
    EventoDB.deleteById(id, function (affectedRows) {
        res.json({msg: 'Evento apagado com sucesso.'});
    });
});

app.get('/eventos/:tipo', function (req, res) {
    let tipo = req.params.tipo;
    EventoDB.getEventosByTipo(tipo, function (eventos) {
        res.json(eventos);
    });
});

app.post('/eventos', function (req, res) {
    let evento = req.body;
    EventoDB.save(evento, function (evento) {
        res.json(evento);
    });
});

app.put('/eventos', function (req, res) {
    let evento = req.body;
    EventoDB.update(evento, function (evento) {
        res.json(evento);
    });
});

let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});

