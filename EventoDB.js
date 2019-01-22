var mysql = require('mysql');
class EventoDB {

    static connect() {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'eventodb'
        });
        connection.connect();
        return connection;
    }

    static getEventos(callback) {
        let connection = EventoDB.connect();
        let sql = "select * from eventos";
        let query = connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

    static getEventosByTipo(tipo, callback) {
        let connection = EventoDB.connect();
        let sql = "select id,nome,tipo from eventos where tipo = '" + tipo + "'";
        let query = connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

    static getEventosById(id, callback) {
        let connection = EventoDB.connect();
        let sql = "select * from eventos where id = ?";
        let query = connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            if (results.length == 0) {
                console.log("Nenhum evento encontrado.");
                return;
            }
            let evento = results[0];
            callback(evento);
        });
        console.log(query.sql);
        connection.end();
    }

    static save(evento, callback) {
        let connection = EventoDB.connect();
        let sql = "insert into eventos set ?";
        let query = connection.query(sql, evento, function (error, results, fields) {
            if (error) throw error;
            evento.id = results.insertId;
            callback(evento);
        });
        console.log(query.sql);
        connection.end();
    }

    static update(evento, callback) {
        let connection = EventoDB.connect();
        let sql = "update eventos set ? where id = ?";
        let id = evento.id;
        let query = connection.query(sql, [evento, id], function (error, results, fields) {
            if (error) throw error;
            callback(evento);
        });
        console.log(query.sql);
        connection.end();
    }

    static delete(evento, callback) {
        let connection = EventoDB.connect();
        let sql = "delete from eventos where id = ?";
        let id = evento.id;
        let query = connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            callback(evento);
        });
        console.log(query.sql);
        connection.end();
    }
    
    static deleteById(id, callback) {
        let connection = EventoDB.connect();
        let sql = "delete from eventos where id = ?";
        let query = connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            callback(results.affectedRows);
        });
        console.log(query.sql);
        connection.end();
    }
};

module.exports = EventoDB;