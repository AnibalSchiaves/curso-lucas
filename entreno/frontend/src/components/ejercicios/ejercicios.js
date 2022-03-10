import React from 'react';
import axios from 'axios';
import './ejercicios.css';
import enviroment from '../../enviroment';
import Ejercicio from '../../model/ejercicio';

class Ejercicios extends React.Component {

    constructor(...args) {
        super(...args);
        var nuevo_ejercicio = new Ejercicio();
        this.state = {
            ejercicios : [],
            modo: Ejercicio.MODO_CONSULTA,
            nuevo: nuevo_ejercicio
        }
    }

    componentWillMount() {
        this.consulta();
    }

    render_alta() {
        return (
            <form>
                <input type="text" id="txtCodigo" name="txtCodigo" placeholder="Ingrese el código" onChange={this.onChange.bind(this)} defaultValue={this.state.nuevo.codigo}></input>
                <input type="text" id="txtNombre" name="txtNombre" placeholder="Ingrese el nombre" onChange={this.onChange.bind(this)} defaultValue={this.state.nuevo.nombre}></input>
                <textarea id="txtDescripcion" name="txtDescripcion" placeholder="Ingrese la descripción" onChange={this.onChange.bind(this)} defaultValue={this.state.nuevo.descripcion}></textarea>
                <button type="button" onClick={this.guardar.bind(this)}>Guardar</button>
                <button type="button" onClick={this.consulta.bind(this)}>Cancelar</button>
            </form>
        );
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
                                <button>Modificar</button>
                                <button>Eliminar</button>
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
                            <button onClick={this.nuevo.bind(this)}>Nuevo</button>                            
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    render() {
        if (this.state.modo === Ejercicio.MODO_ALTA) {
            return this.render_alta();
        } else {
            return this.render_consulta();
        }
    }

    nuevo() {
        this.setState({
            modo : Ejercicio.MODO_ALTA
        })
    }

    guardar() {
        axios.post(enviroment.api_url+"ejercicios", this.state.nuevo)
            .then(res => {
                    this.consulta();
                });
        
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
            nuevo : {
                codigo: document.getElementById("txtCodigo").value,
                nombre: document.getElementById("txtNombre").value,
                descripcion: document.getElementById("txtDescripcion").value
            }
        })
    }

}

Ejercicio.MODO_CONSULTA = "consulta";
Ejercicio.MODO_ALTA = "alta";

export default Ejercicios;