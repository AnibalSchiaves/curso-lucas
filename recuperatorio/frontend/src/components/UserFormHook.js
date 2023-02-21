import React from "react";
import { useState, useEffect } from "react";
import { saveUser, fetchUser } from "../reducers/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            ...emptyUser
        }
    });

    useEffect(()=>{
        async function getUser() {
            if (id) {
                const response = await dispatch(fetchUser(id)).unwrap();
                delete response._id;
                response.fechaNacimiento = response.fechaNacimiento.substring(0,10);
                reset(response);
            }
            setExito(null);
        }
        getUser();
    },[id]);

    const submit = async (data,e) => {
        try {
            const param = {
                id,
                user: data
            };
            const response = await dispatch(saveUser(param)).unwrap();
            if (!response.error) {
                //setExito("El usuario se grabó correctamente");
                alert("El usuario se grabó correctamente");
                e.target.reset();
                navigate("/usuarios",{replace:false});
            }
            
            //alert("grabo correctamente");
        } catch(err) {
            alert("error al grabar");
        }
    }

    const navigate = useNavigate();

    const handleReset = () => {
        reset(emptyUser);
        navigate("/usuarios",{replace:true});
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
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
                <input 
                    type="text" 
                    id="nombre" 
                    {...register("nombre",{ required: true})}>
                </input>
                {errors.nombre?.type === 'required' && <p role="alert">Nombre es requerido</p>}
            </div>
            <div className="row">
                <label>Apellido</label>
                <input 
                    type="text" 
                    id="apellido" 
                    {...register("apellido", {required: true})}>
                </input>
                {errors.apellido?.type === 'required' && <p role="alert">Apellido es requerido</p>}
            </div>
            <div className="row">
                <label>DNI</label>
                <input 
                    type="number" 
                    id="dni" 
                    {...register("dni")}>
                </input>
            </div>
            <div className="row">
                <label>Fecha Nacimiento</label>
                <input 
                    type="date" 
                    id="fechaNacimiento" 
                    {...register("fechaNacimiento")}>
                </input>
            </div>
            <div className="row">
                <label>Nacionalidad</label>
                <input 
                    type="text" 
                    id="nacionalidad" 
                    {...register("nacionalidad")}>
                </input>
            </div>
            <div className="row">
                <label>Email</label>
                <input 
                    type="email" 
                    id="email" 
                    {...register("email")}>
                </input>
            </div>
            <div className="row">
                <label>Contraseña</label>
                <input 
                    type="password" 
                    id="contrasenia" 
                    {...register("contrasenia")}>
                </input>
            </div>
            <div className="row">
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleReset}>Cancelar</button>
            </div>
            </fieldset>
        </form>
       
    );
}