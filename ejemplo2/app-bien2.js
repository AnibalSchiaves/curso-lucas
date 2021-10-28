const ejercicioModule = require('./ejercicio');
const Ejercicio = ejercicioModule.Ejercicio;
const db = ejercicioModule.db;

async function consultarTodos() {
    Ejercicio.find(function(err, ejercicios) {
        if (err) {
            console.log(`Error al consultar ejercicios: ${err}`);
        } else {
            console.log('Ejercicios al inicio del script: ');
            console.log(ejercicios);
        }
    });
}

async function consultarPorId(id) {
    let ejercicioObtenido = await Ejercicio.findById(id);
    console.log(`Obteniendo ejercicio con id ${id}:`);
    console.log(ejercicioObtenido);
    return ejercicioObtenido;
}   

async function borrar(ejercicio) {
    let ejer = await ejercicio.delete();
    console.log('Ejercicio borrado:');
    console.log(ejer);
}

db.once('open', async function() {
    //main();
    await consultarTodos();
    let nuevoId = await crear();
    let ejercicio = await consultarPorId(nuevoId);
    await borrar(ejercicio);
    await consultarTodos();
});

async function crear() {
    let ejercicioNuevo = new Ejercicio({
        codigo: 'prueba',
        nombre: 'Ejercicio de Prueba',
        descripcion: 'Este es una ejercicio de prueba'
    });

    let ejercicioGuardado = await ejercicioNuevo.save();

    console.log('Ejercicio grabado:');
    console.log(ejercicioGuardado);
    return ejercicioGuardado._id;
    
}