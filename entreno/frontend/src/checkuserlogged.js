import AuthContext from "./authcontext";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function useUserLogged() {
    const [user] = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (!user) {
            console.log("Usuario no logueado, se redirije a login")
            navigate("/login");
        }
    });

    return user;
}