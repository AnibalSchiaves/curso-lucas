var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ejercicioSchema = new Schema({
    codigo: {type: String},
    nombre: {type: String},
    descripcion: {type: String}
});

module.exports = mongoose.model("ejercicio", ejercicioSchema);