import React from "react";
import { useState, useEffect } from "react";
import { saveUser, fetchUser } from "../reducers/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../controls/Input";
import Button from "../controls/Button";
import "./UserForm.css";

export default function({id, title = "Alta/Modificación de Usuario"}) {

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
            <legend>{title}</legend>
            <div className="row exito">
                {exito?<p>{exito}</p>:''}
            </div>
            <div className="row error">
                {error?<p>{error}</p>:''}
            </div>
            <Input  type="text" 
                    id="nombre" 
                    label="Nombre" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="text" 
                    id="apellido" 
                    label="Apellido" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="number" 
                    id="dni" 
                    label="DNI" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="date" 
                    id="fechaNacimiento" 
                    label="Fecha Nacimiento" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="text" 
                    id="nacionalidad" 
                    label="Nacionalidad" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="email" 
                    id="email" 
                    label="Email" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <Input  type="password" 
                    id="contrasenia" 
                    label="Contraseña" 
                    register={register} 
                    registerOptions={{required:true}}
                    errors={errors}>
            </Input>
            <div className="row">
                <Button type="submit">Guardar</Button>
                <Button type="button" onClick={handleReset}>Cancelar</Button>
            </div>
            </fieldset>
        </form>
       
    );
}