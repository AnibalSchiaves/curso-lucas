const Ejercicio = require('./ejercicio');

Ejercicio.find(function(err, ejercicios) {
    if (err) {
        console.log(`Error al consultar ejercicios: ${err}`);
    } else {
        console.log('Ejercicios cargados: ');
        console.log(ejercicios);
    }
});

var ejercicioNuevo = new Ejercicio({
    codigo: 'prueba',
    nombre: 'Ejercicio de Prueba',
    descripcion: 'Este es una ejercicio de prueba'
});

var nuevoId;

ejercicioNuevo.save(function(err, ejercicio) {
    if (err) {
        console.log(`Error al grabar el ejercicio: ${err}`);
    } else {
        console.log('Ejercicio grabado:');
        console.log(ejercicio);
        nuevoId = ejercicio._id;
    }
});

var ejercicioNuevo;

Ejercicio.findById(nuevoId, function(err, ejercicio) {
    if (err) {
        console.log(`Error al consultar el ejercicio con id ${nuevoId}: ${err}`);
    } else {
        console.log(`Ejercicio con id ${nuevoId}:`);
        ejercicioNuevo = ejercicio;
        console.log(ejercicioNuevo);
    }
});

ejercicioNuevo.delete(function (err, ejercicio) {
    if (err) {
        console.log(`Error al borrar el ejercicio con id ${nuevoId}: ${err}`);
    } else {
        console.log('Ejercicio borrado:');
        console.log(ejercicioNuevo);     
    }
});