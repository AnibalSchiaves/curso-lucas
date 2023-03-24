import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../controls/Button';
import { getUserLogged } from '../reducers/authSlice';
import { useDispatch } from 'react-redux';
import NavBar from './NavBar';

export default function() {
    const user = useSelector(getUserLogged);
    const dispatch = useDispatch();
    
    return (
        <>
        <NavBar></NavBar>
        <div>
            <h3>
                <p>Bienvenido {user?(user.nombre):'usuario'}</p>
                <p>Este es el trabajo práctivo para el recuperatorio de Lucas Cabrera
                de la materia Modelos Computacionales para la Administración</p>
            </h3>
        </div>
        </>
    )
}