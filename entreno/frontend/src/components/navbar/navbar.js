import React, { useContext } from "react";
import {NavLink} from 'react-router-dom';
import AuthContext from "../../authcontext";
import Logout from "../logout/logout-google";
import './navbar.css';
import useUserLogged from "../../checkuserlogged";

export default function NavBar() {
    const [user] = useContext(AuthContext);
    const liLogout = user?<li><Logout></Logout></li>:<></>;
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/quienessomos">Quienes Somos</NavLink></li>
                <li><NavLink to="/ejercicios">Ejercicios</NavLink></li>
                <li><NavLink to="/entrenamientos">Entrenamientos</NavLink></li>
                {/* <li><NavLink to="/salir">Salir</NavLink></li> */}
                {liLogout}
            </ul>
        </nav>
    );
    

}