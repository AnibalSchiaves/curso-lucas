const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ejercicioSchema = new Schema({
    codigo: {type: String},
    nombre: {type: String},
    descripcion: {type: String}
});

var Ejercicio = mongoose.model("ejercicio", ejercicioSchema);

mongoose.connect("mongodb://localhost:27017/entreno", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", function(err) {
    console.log(`Error de conexión: ${err}`);
});

module.exports.Ejercicio = Ejercicio;
module.exports.db = db;