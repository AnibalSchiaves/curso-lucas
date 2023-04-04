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
            <div>
                <h3>Bienvenido {user?(user.nombre):'usuario'}</h3>
                <h4>Este es el trabajo práctivo para el recuperatorio de Lucas Cabrera
                de la materia Modelos Computacionales para la Administración</h4>
            </div>
        </div>
        </>
    )
}