import React from 'react';
import axios from 'axios';
import './ejercicios.css';
import enviroment from '../../enviroment';
import Ejercicio from '../../model/ejercicio';

class Ejercicios extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            ejercicios : [],
            modo: Ejercicio.MODO_CONSULTA,
        }
        this.guardar = this.guardar.bind(this);
        this.consulta = this.consulta.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.editar = this.editar.bind(this);
    }

    componentWillMount() {
        this.consulta();
    }

    render_edicion() {
        return (<>
            <h2>Mantenimiento de Ejercicios</h2>
            <form>
                <input type="hidden" id="txtId" name="txtId" defaultValue={this.state.current.id}></input>
                <input type="text" id="txtCodigo" name="txtCodigo" placeholder="Ingrese el código" onChange={this.onChange.bind(this)} defaultValue={this.state.current.codigo}></input>
                <input type="text" id="txtNombre" name="txtNombre" placeholder="Ingrese el nombre" onChange={this.onChange.bind(this)} defaultValue={this.state.current.nombre}></input>
                <textarea id="txtDescripcion" name="txtDescripcion" placeholder="Ingrese la descripción" onChange={this.onChange.bind(this)} defaultValue={this.state.current.descripcion}></textarea>
                <button type="button" onClick={this.guardar}>Guardar</button>
                <button type="button" onClick={this.consulta}>Cancelar</button>
            </form>
        </>);
    }

    render_consulta() {
        let filas;
        if (this.state.ejercicios.length>0) {
            filas = this.state.ejercicios.map(ej => {
                    return (
                        <tr key={ej.codigo}>
                            <td>{ej.codigo}</td>
                            <td>{ej.nombre}</td>
                            <td>{ej.descripcion}</td>
                            <td>
                                <button type="button" data-id={ej.id} onClick={this.editar}>Modificar</button>
                                <button type="button" data-id={ej.id} onClick={this.eliminar}>Eliminar</button>
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
                            <button onClick={this.agregar.bind(this)}>Nuevo</button>                            
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    render() {
        if (this.state.modo === Ejercicio.MODO_ALTA
            || this.state.modo === Ejercicio.MODO_EDICION) {
            return this.render_edicion();
        } else {
            return this.render_consulta();
        }
    }

    agregar() {
        this.setState({
            current: new Ejercicio(),
            modo : Ejercicio.MODO_ALTA
        })
    }

    editar(e) {
        axios.get(enviroment.api_url+"ejercicios/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        this.setState({
                            current: res.data,
                            modo : Ejercicio.MODO_EDICION
                        });
                    } else {
                        alert("Hubo un error al obtener el ejercicio");
                    }
                });
    }

    guardar() {
        if (this.state.modo === Ejercicio.MODO_ALTA) {
            axios.post(enviroment.api_url+"ejercicios", this.state.current)
                .then(res => {
                        alert("El ejercicio ha sido guardado");
                        this.consulta();
                    });
        } else if (this.state.modo === Ejercicio.MODO_EDICION) {
            axios.put(enviroment.api_url+"ejercicios/"+this.state.current.id, this.state.current)
                .then(res => {
                        alert("El ejercicio ha sido guardado");
                        this.consulta();
                    });
        }
    }

    eliminar(e) {
        if (window.confirm("Esta seguro de eliminar el ejercicio")) {
            axios.delete(enviroment.api_url+"ejercicios/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        alert("El ejercicio ha sido borrado");
                        this.consulta();
                    } else {
                        alert("Hubo un error al borrar el ejercicio");
                    }
                });
        }
    }

    consulta() {
        axios.get(enviroment.api_url+"ejercicios")
            .then(res => {
                this.setState({
                    ejercicios : res.data,
                    modo : Ejercicio.MODO_CONSULTA
                })
            })
        
    }

    onChange() {
        this.setState({
            current : {
                id : document.getElementById("txtId").value,
                codigo: document.getElementById("txtCodigo").value,
                nombre: document.getElementById("txtNombre").value,
                descripcion: document.getElementById("txtDescripcion").value
            }
        })
    }

}

Ejercicio.MODO_CONSULTA = "consulta";
Ejercicio.MODO_ALTA = "alta";
Ejercicio.MODO_EDICION = "edicion";

export default Ejercicios;