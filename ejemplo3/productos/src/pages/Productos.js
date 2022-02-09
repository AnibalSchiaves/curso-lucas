import React from 'react';
import { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import './Productos.css';
import axios from 'axios';

const Productos = () => {
    const [arrayProductos, setProductos] = useState([]);
    useEffect(
        () => {
            //fetch("http://localhost:3001/productos")
            //    .then(res => res.json())
            //    .then(data => setProductos(data));
    
            axios.get("http://localhost:3001/productos")
            .then(res => setProductos(res.data));
        },[]
    );
    
    return (
        <>
            <Menu></Menu>
            <h2>Productos</h2>
            <ul className="productos">
                {arrayProductos.length==0?
                <li>Cargando...</li>:
                arrayProductos.map(function(p, index) {
                    return (
                        <li key={index}>
                            <h3>{p.nombre}</h3>
                            <p>{p.descripcion}</p>
                        </li>
                    )
                })
                }
            </ul>
        </>
    )
};

export default Productos;