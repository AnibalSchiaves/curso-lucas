import React from "react";
import {NavLink} from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/ejercicios">Ejercicios</NavLink></li>
            </ul>
        </nav>
    );

}