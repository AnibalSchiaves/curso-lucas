class EjercicioRealizado {

    /*constructor() {
        this.ejercicio = null;
        this.series = [];
        this.unidad = null;
        this.volumen = null;
    }*/

    constructor(idEjercicio = null, series = [], unidad = null, volumen = null) {
        this.ejercicio = idEjercicio;
        this.series = series;
        this.unidad = unidad;
        this.volumen = volumen;
    }

}

export default EjercicioRealizado;