import React, {useEffect, useState} from "react";
import './ejercicios.css';
import axios from "axios";
import enviroment from "../../enviroment";
import { Field, Form } from "react-final-form";
import NavBar from "../navbar/navbar";

function Ejercicios2() {

    const MODO_CONSULTA = "consulta";
    const MODO_ALTA = "alta";
    const MODO_EDICION = "edicion";

    const [modo, setModo] = useState(MODO_CONSULTA);
    const [ejercicios, setEjercicios] = useState([]);
    const [current, setCurrent] = useState({});

    const consulta = () => {
        setModo(MODO_CONSULTA);
    }

    const editar = (e) => {
        axios.get(enviroment.api_url+"ejercicios/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        setCurrent(res.data);
                        setModo(MODO_EDICION);
                    } else {
                        alert("Hubo un error al obtener el ejercicio");
                    }
                });
    }

    const eliminar = (e) => {
        if (window.confirm("Esta seguro de eliminar el ejercicio")) {
            axios.delete(enviroment.api_url+"ejercicios/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        alert("El ejercicio ha sido borrado");
                        consulta();
                    } else {
                        alert("Hubo un error al borrar el ejercicio");
                    }
                });
        }
    }

    const agregar = () => {
        setCurrent({
            id: null,
            codigo: null,
            nombre: null,
            descripcion: null
        })
        setModo(MODO_ALTA);
    }

    useEffect(
        () => {
            console.log("se va a ejecutar el efecto");
            if (modo === MODO_CONSULTA) {
                console.log("se va a llamar a la api");
                axios.get(enviroment.api_url+"ejercicios")
                .then(res => {
                    setEjercicios(res.data);
                });
            }
        }, [modo]
    );

    const render_consulta = function() {
        console.log("llamada a render_consulta");
        let filas;
        if (ejercicios.length>0) {
            filas = ejercicios.map(ej => {
                    return (
                        <tr key={ej.codigo}>
                            <td>{ej.codigo}</td>
                            <td>{ej.nombre}</td>
                            <td>{ej.descripcion}</td>
                            <td>
                                <button type="button" data-id={ej.id} onClick={editar}>Modificar</button>
                                <button type="button" data-id={ej.id} onClick={eliminar}>Eliminar</button>
                            </td>
                        </tr>
                    )
                }
            );
        } else {
            filas = (
                <tr key={0}>
                    <td colSpan={4}>
                        No hay ejercicios cargados
                    </td>
                </tr>
            )
        }
        return (
            <>
                <NavBar></NavBar>
                <h2>Mantenimiento de Ejercicios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={4}>
                            <button onClick={agregar}>Nuevo</button>                            
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    const required = value => (value ? undefined : 'Requerido');

    const onSubmit = async values => {
        if (modo === MODO_ALTA) {
            axios.post(enviroment.api_url+"ejercicios", values)
                .then(res => {
                        alert("El ejercicio ha sido guardado");
                        consulta();
                    });
        } else if (modo === MODO_EDICION) {
            axios.put(enviroment.api_url+"ejercicios/"+values.id, values)
                .then(res => {
                        alert("El ejercicio ha sido guardado");
                        consulta();
                    });
        }
    }

    const render_edicion = () => {
        return (<>
            <NavBar></NavBar>
            <h2>Mantenimiento de Ejercicios</h2>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    id: current.id,
                    codigo: current.codigo, 
                    nombre: current.nombre, 
                    descripcion: current.descripcion
                }}
                render={({handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <Field name="id" component="input" type="hidden" />
                <Field name="codigo" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <input {...input} type="text" placeholder="Ingrese el código" className={(meta.error && meta.touched)?"error":""}  />
                        </div>
                    )}
                </Field>
                <Field name="nombre" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <input {...input} type="text" placeholder="Ingrese el nombre" className={(meta.error && meta.touched)?"error":""} />
                        </div>
                    )}
                </Field> 
                <Field name="descripcion" component="textarea" type="text" placeholder="Ingrese la descripción" />
                <button type="submit" disabled={submitting || pristine}>Guardar</button>
                <button type="button" onClick={consulta}>Cancelar</button>
            </form>
                )} />
        </>);
    }
    
    if (modo === MODO_ALTA || modo === MODO_EDICION) {
        return render_edicion();
    } else {
        return render_consulta();
    }

}

export default Ejercicios2;