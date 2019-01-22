let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("API Eventos de Bike");
});

app.get('/eventos', function (req, res) {
    res.send("Lista de todos os eventos do site");
});

app.get('/eventos/:tipo', function (req, res) {
    let tipo = req.params.tipo;
    res.send("Lista de eventos do tipo " + tipo);
});

let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});

