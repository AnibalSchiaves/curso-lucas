class Modo {

    static MODO_CONSULTA = new Modo("consulta");
    static MODO_ALTA = new Modo("alta");
    static MODO_EDICION = new Modo("edicion");

    constructor(valor) {
        this.valor = valor;
    }

}

export default Modo;