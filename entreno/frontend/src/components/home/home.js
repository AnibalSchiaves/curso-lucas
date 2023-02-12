import React, { useContext } from "react";
import NavBar from '../navbar/navbar';
import AuthContext from "../../authcontext";
import useUserLogged from "../../checkuserlogged";

export default function Home() {
    //const [user] = useContext(AuthContext);
    const user = useUserLogged();
    return (
        <>
            <NavBar></NavBar>
            <h2>Bienvenido {user==null?'':user.name} {user==null?'':user.nombre} {user==null?'':user.apellido}</h2>
        </>
    )
} 