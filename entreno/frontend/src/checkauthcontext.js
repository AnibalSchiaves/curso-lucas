import React from "react";
import { useContext } from "react";
import AuthContext from "./authcontext";
import { Navigate } from "react-router-dom";

export default function CheckAuthContext() {
    const [user] = useContext(AuthContext);
    
    if (!user) {
        console.log("Usuario no logueado, redirigiendo a login");
        return <Navigate replace to="/login" />
    } else {
        return <></>
    }
}

