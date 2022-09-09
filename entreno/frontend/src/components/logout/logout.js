import React, {useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../authcontext";


export default function Logout() {
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        setUser(undefined);
        navigate('/');
    });
    return <p>Saliendo...</p>;
}