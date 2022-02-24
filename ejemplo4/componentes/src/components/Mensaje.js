import React, { Component } from 'react';

class Mensaje extends Component {
    /* Este es un componente sin estado (stateless) y de tipo clase (class component) */
    render() {
        return (
            <div>
                Bienvenido {this.props.nombre}, soy el componente mensaje!
            </div>
        );
    }
}

//Se van a inicializar las propiedades con sus valores por defecto
//Dicha inicialización es a nivel de clase, se hace una sola vez 
//sin importar la cantidad de instancias que tengamos
Mensaje.defaultProps = {
    nombre : 'Usuario'
}

export default Mensaje;