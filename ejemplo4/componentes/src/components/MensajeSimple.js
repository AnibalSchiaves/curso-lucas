import React from 'react';

export default function(propiedades) {
    /* Este es un componente sin estado (stateless) y de tipo funcional (functional component) */
    return (
        <div>
            Bienvenido {propiedades.nombre}, soy el componente mensaje simple!
        </div>
    );
}


