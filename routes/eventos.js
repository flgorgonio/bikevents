let express = require('express');
const router = express.Router();
const EventoDB = require('../model/EventoDB');

router.get('/', function (req, res) {
    EventoDB.getEventos(function (eventos) {
        res.json(eventos);        
    });
});

router.get('/:id(\\d+)', function (req, res) {
    let id = req.params.id;
    EventoDB.getEventosById(id, function (evento) {
        res.json(evento);
    });
});

router.delete('/:id(\\d+)', function (req, res) {
    let id = req.params.id;
    console.log("Apagar evento " + id);
    EventoDB.deleteById(id, function (affectedRows) {
        res.json({msg: 'Evento apagado com sucesso.'});
    });
});

router.get('/:tipo', function (req, res) {
    let tipo = req.params.tipo;
    EventoDB.getEventosByTipo(tipo, function (eventos) {
        res.json(eventos);
    });
});

router.post('/', function (req, res) {
    let evento = req.body;
    EventoDB.save(evento, function (evento) {
        res.json(evento);
    });
});

router.put('/', function (req, res) {
    let evento = req.body;
    EventoDB.update(evento, function (evento) {
        res.json(evento);
    });
});

module.exports = router