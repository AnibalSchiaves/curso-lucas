import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { getUsers, fetchUsers, deleteUser } from "../reducers/usersSlice";
import { useEffect } from "react";
import User from "./User";
import UserForm from "./UserFormHook";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function() {
    const usuarios = useSelector(getUsers);

    const status = useSelector(state => state.users.status);

    const { id } = useParams();

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(status);
        if (status=='idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch,status]);
    
    const confirmAndDeleteUser = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar el usuario?")) 
            dispatch(deleteUser(id));
    };

    const editUser = (id) => {
        navigate("/usuarios/"+id, {replace: true});
    }

    return (
        <>
        <NavBar></NavBar>
        <div>
            <fieldset>
            <legend>Lista de Usuarios</legend>
            <table>
                <thead>
                    <tr key={0}>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Fec. Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => <User onDelete={() => confirmAndDeleteUser(u._id)} onEdit={() => editUser(u._id)} user={u} key={u._id}></User>)}
                </tbody>
            </table>
            </fieldset>
            <UserForm id={id}></UserForm>
        </div>
        </>
    )
}