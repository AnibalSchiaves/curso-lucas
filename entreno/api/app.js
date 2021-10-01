// Utilizar funcionalidades del Ecmascript 6
'use strict'

var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var ejerciciosController = require("./controller/ejercicios");

app.use(bodyParser.json());

var router = express.Router();

router.route("/ejercicios")
    .get(ejerciciosController.findAll)
    .post(ejerciciosController.create);
router.route("/ejercicios/:id")
    .get(ejerciciosController.findById);

app.use(router);

app.get("/", function(req, res) {
    res.send("Bienvenido a la api de entreno");
});

mongoose.connect("mongodb://localhost/entreno", function(err, res) {
    if (err) {
        console.log(`Error conectando a la base de datos entreno. Err: ${err}`);
    }   
    app.listen(3000, function() {
        console.log("Api de entreno corriendo en http://localhost:3000");
    });
});
