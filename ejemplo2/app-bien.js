const ejercicioModule = require('./ejercicio');
const Ejercicio = ejercicioModule.Ejercicio;
const db = ejercicioModule.db;

db.once('open', function() {
    main();
});

function main() {
    'use strict';
    Ejercicio.find(function(err, ejercicios) {
        if (err) {
            console.log(`Error al consultar ejercicios: ${err}`);
        } else {
            console.log('Ejercicios al inicio del script: ');
            console.log(ejercicios);
    
            //Creo un nuevo ejercicio
            let ejercicioNuevo = new Ejercicio({
                codigo: 'prueba',
                nombre: 'Ejercicio de Prueba',
                descripcion: 'Este es una ejercicio de prueba'
            });
            
            ejercicioNuevo.save(function(err, ejercicio) {
                if (err) {
                    console.log(`Error al grabar el ejercicio: ${err}`);
                } else {
                    console.log('Ejercicio grabado:');
                    console.log(ejercicio);
                    let nuevoId = ejercicio._id;
    
                    //Obtengo ejercicio recien creado
                    Ejercicio.findById(nuevoId, function(err, ejercicio) {
                        if (err) {
                            console.log(`Error al consultar el ejercicio con id ${nuevoId}: ${err}`);
                        } else {
                            console.log(`Obteniendo ejercicio con id ${nuevoId}:`);
                            let ejercicioObtenido = ejercicio;
                            console.log(ejercicioObtenido);
    
                            //Borro ejercicio creado
                            ejercicioObtenido.delete(function (err, ejer) {
                                if (err) {
                                    console.log(`Error al borrar el ejercicio con id ${nuevoId}: ${err}`);
                                } else {
                                    console.log('Ejercicio borrado:');
                                    console.log(ejer);    
                                    
                                    Ejercicio.find(function(err, ejercicios) {
                                        if (err) {
                                            console.log(`Error al consultar ejercicios: ${err}`);
                                        } else {
                                            console.log('Ejercicios al final del script: ');
                                            console.log(ejercicios);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}