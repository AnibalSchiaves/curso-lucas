import React from 'react';
import './Pie.css';

const Pie = (props) => {
    return <p className="pie">
        {props.resaltar ? 
            <strong>&reg;Desarrollado por {props.creador} </strong>
             : 
            <span>&reg; Desarrollado por {props.creador} </span>}
    </p>;
};

export default Pie;