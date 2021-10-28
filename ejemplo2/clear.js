const moduleEjercicio = require('./ejercicio');
const Ejercicio = moduleEjercicio.Ejercicio;

Ejercicio.find({codigo: /^prueba/}, function(err, ejercicios) {
    if (err) {
        console.log(`Error obteniendo ejercicios con código prueba: ${err}`);
    } else {
        ejercicios.forEach(ejercicio => {
            ejercicio.delete(function(err, e) {
                if (err) {
                    console.log(`Error borrando ejercicio: ${err}`);
                } else {
                    console.log(`Se borro el ejercicio: ${e}`);
                }
            });
        });
    }
});

return 1;