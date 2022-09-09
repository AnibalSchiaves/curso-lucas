import React, { useContext } from "react";
import AuthContext from "../../authcontext";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function login() {
        let nombre = document.getElementById('txtNombre').value;
        let apellido = document.getElementById('txtApellido').value;
        let usuario = {
            nombre: nombre,
            apellido: apellido
        }
        console.log("vamos a loguear a "+usuario.nombre+" "+usuario.apellido);
        setUser(usuario);
        navigate('/');
    }

    return (
        <>
            <h2>Login</h2>
            <form>
            <input id="txtNombre" type="text" placeholder="Nombre..."></input>
            <input id="txtApellido" type="text"  placeholder="Apellido..." ></input>
            <button onClick={login}>Ingresar</button>
            </form>
        </>
    )
    
}

export default Login;