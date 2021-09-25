var express = require('express');
var app = express();

app.get('/', function(req, res) {
    let lucas = {
        "nombre":"lucas",
        "direccion":"Belgrano 333"
    }
    res.header("Access-Control-Allow-Origin","*");
    res.send(lucas);
});

app.listen(3000, function() {
    console.log("Aplicación escuchando en puerto 3000");
})