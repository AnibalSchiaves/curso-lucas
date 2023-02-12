import React from "react";
import { useState, useEffect } from "react";
import { saveUser, fetchUser } from "../reducers/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";

export default function({id}) {

    const dispatch = useDispatch();

    const error = useSelector((state) => state.users.error);

    const [exito,setExito] = useState();

    let emptyUser = {
        nombre:'',
        apellido:'',
        dni:'',
        fechaNacimiento:'',
        nacionalidad:'',
        email:'',
        contrasenia:''
    }

    const [userData, setUserData] = useState(emptyUser);

    useEffect(()=>{
        async function getUser() {
            if (id) {
                const response = await dispatch(fetchUser(id)).unwrap();
                delete response._id;
                setUserData(response);
            } else {
                setUserData(emptyUser);
            }
            setExito(null);
        }
        getUser();
    },[id]);

    const handleChange = (id) => {
        if (exito)
            setExito(null);
        userData[id] = document.getElementById(id).value;
        setUserData({...userData});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const param = {
                id,
                user: userData
            };
            const response = await dispatch(saveUser(param)).unwrap();
            if (!response.error) {
                //setExito("El usuario se grabó correctamente");
                alert("El usuario se grabó correctamente");
                setUserData(emptyUser);
                navigate("/usuarios",{replace:false});
            }
            
            //alert("grabo correctamente");
        } catch(err) {
            alert("error al grabar");
        }
    }

    const navigate = useNavigate();

    const handleReset = () => {
        setUserData(emptyUser);
        setExito(null);
        navigate("/usuarios",{replace:true});
    }

    return (
        <form>
            <fieldset>
            <legend>Alta/Modificación de Usuario</legend>
            <div className="row exito">
                {exito?<p>{exito}</p>:''}
            </div>
            <div className="row error">
                {error?<p>{error}</p>:''}
            </div>
            <div className="row">
                <label>Nombre</label>
                <input type="text" id="nombre" value={userData['nombre']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>Apellido</label>
                <input type="text" id="apellido" value={userData['apellido']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>DNI</label>
                <input type="number" id="dni" value={userData['dni']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>Fecha Nacimiento</label>
                <input type="date" id="fechaNacimiento" value={userData['fechaNacimiento']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>Nacionalidad</label>
                <input type="text" id="nacionalidad" value={userData['nacionalidad']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>Email</label>
                <input type="email" id="email" value={userData['email']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <label>Contraseña</label>
                <input type="password" id="contrasenia" value={userData['contrasenia']} onChange={(event)=>{handleChange(event.target.id)}}></input>
            </div>
            <div className="row">
                <button type="button" onClick={handleSubmit}>Guardar</button>
                <button type="button" onClick={handleReset}>Cancelar</button>
            </div>
            </fieldset>
        </form>
       
    );
}