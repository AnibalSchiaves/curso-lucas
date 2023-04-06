import React from "react";
import { NavLink } from "react-router-dom";
import { getUserLogged, logout } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function() {
    const dispatch = useDispatch();
    const user = useSelector(getUserLogged);

    return <navbar>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/usuarios">Usuarios</NavLink></li>
            {user?<li><NavLink to="/" onClick={() => {dispatch(logout())}}>Salir</NavLink></li>:''}
          </ul>
        </navbar>
        
}