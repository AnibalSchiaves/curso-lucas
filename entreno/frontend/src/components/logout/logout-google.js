import React, {useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../authcontext";
import { GoogleLogout } from "react-google-login";


export default function Logout() {
    const clientId = '720747557696-al9bv0g47d3k7inhv6so98src5gt8u31.apps.googleusercontent.com';

    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function logOut() {
        setUser(undefined);
        navigate('/');
    }
    return <><GoogleLogout render={renderProps => (<a href="" onClick={renderProps.onClick}>Salir</a>)} clientId={clientId} onLogoutSuccess={logOut} /></>;
}