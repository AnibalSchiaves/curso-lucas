import React from "react";
import Input from "../controls/Input";
import Button from "../controls/Button";
import { useForm } from "react-hook-form";
import { login } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    let emptyLogin = {
        usuario: '',
        contrasenia: ''
    }

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            ...emptyLogin
        }
    });

    const submit = async (data, e) => {
        const response = await dispatch(login(data)).unwrap();
        if (response) {
            navigate("/home");
        } else {
            setError("Credenciales no válidas");
        }
    }

    const registrarse = () => {
        navigate("/registro");
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <fieldset>
                <legend>Login de Usuario</legend>
                <div className="row error">
                    {error?<p>{error}</p>:''}
                </div>
                <Input 
                    type="text"
                    id="usuario"
                    label="Usuario"
                    register={register}
                    registerOptions={{required:true}}
                    errors={errors}
                />
                <Input 
                    type="password"
                    id="contrasenia"
                    label="Contraseña"
                    register={register}
                    registerOptions={{required:true}}
                    errors={errors}
                />
                <div className="row">
                    <Button type="submit">Ingresar</Button>
                </div>
                <hr></hr>
                <div className="row">
                    <p>Si no posee usuario registrese.</p>
                    <Button type="button" onClick={registrarse}>Registrarse</Button>
                </div>
            </fieldset>
        </form>
    )
};