import React from "react";
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../authcontext";

export default function Login() {

    const clientId = '720747557696-al9bv0g47d3k7inhv6so98src5gt8u31.apps.googleusercontent.com';

    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
    const initClient = () => {
        gapi.auth2.getAuthInstance({
            clientId: clientId,
            scope: ''
        });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log('success:', res);
        setUser(res.profileObj);
        navigate('/');
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    return (
        <>
        <br/>
       <GoogleLogin
          clientId={clientId}
          buttonText="Ingresar con Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
      </>
    );
}