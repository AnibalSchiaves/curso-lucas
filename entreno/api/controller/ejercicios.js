var mongoose = require("mongoose");
var modelEjercicio = require("../model/ejercicio");

exports.findAll = function(req, res) {
    modelEjercicio.find(function(err, ejercicios) {
        if (err)
            res.send(500, err.message);
        console.log("Obteniendo ejercicios");
        res.status(200).jsonp(ejercicios);
    });
};

exports.findById = function(req, res) {
    modelEjercicio.findById(req.params.id, function(err, ejercicio) {
        if (err)
            res.send(500, err.message);
        console.log(`obteniendo ejercicio con id ${req.params.id}`);
        res.status(200).jsonp(ejercicio);
    });
};

var validate = (body) => {
    if (body.codigo==null || body.codigo=='') {
        return "Debe indicar un código";
    }
    if (body.nombre==null || body.nombre=='') {
        return "Debe indicar un nombre";
    }
}

exports.create = function(req, res) {
    
    var msg = validate(req.body);
    if (msg) {
        res.status(400).send(msg);
        return
    }
        
    var ejecicio = new modelEjercicio({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    ejecicio.save(function (err, ejercicio) {
        if (err)
            res.status(500).send(err.message);
        console.log("Creando ejercicio");
        res.status(200).jsonp(ejercicio);
    });
};