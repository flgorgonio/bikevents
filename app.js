let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/eventos', require('./routes/eventos'));

let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});

