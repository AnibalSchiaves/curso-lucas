import React, { useContext } from "react";
import NavBar from '../navbar/navbar';
import AuthContext from "../../authcontext";
import CheckAuthContext from "../../checkauthcontext";

export default function Home() {
    const [user] = useContext(AuthContext);
    return (
        <>
            <CheckAuthContext></CheckAuthContext>
            <NavBar></NavBar>
            <h2>Bienvenido {user==null?'':user.name} {user==null?'':user.nombre} {user==null?'':user.apellido}</h2>
        </>
    )
} 