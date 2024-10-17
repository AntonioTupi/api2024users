// const express = require('express');
// const app = express();
// const port = 3000;
const { Connection } = require('tedious');


var config = {
    "server": "localhost",
    "authentication": {
        "type": "default",
        "options": {
            "userName": "sa",
            "password": "12345"
        }
    },
    "options": {
        "port": 1433,
        "database": "api",
        "trustServerCertificate": true
    }
}
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log('Falhou a conexão');
        throw err;
    }

    // se não der erro, completa a conexão com o servidor SQL
    console.log("Connectado !");
});

connection.connect();
//fim