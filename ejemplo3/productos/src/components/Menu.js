import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/productos'}>Productos</Link></li>
            <li><Link to={'/quienesomos'}>Quienes Somos</Link></li>
        </ul>
    );
};

export default Menu;