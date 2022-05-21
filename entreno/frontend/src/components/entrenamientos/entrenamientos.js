import React from 'react';
import Modo from '../modos';
import enviroment from '../../enviroment';
import axios from 'axios';
import Util from '../utils';

class Entrenamientos extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entrenamientos : [],
            modo: Modo.MODO_CONSULTA
        }
        this.agregar = this.agregar.bind(this);
        this.editar = this.editar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    componentDidMount() {
        this.consulta();
    }

    consulta() {
        axios.get(enviroment.api_url+'entrenamientos')
            .then(res => {
                this.setState({
                    entrenamientos: res.data,
                    modo : Modo.MODO_CONSULTA
                });
            });
    }

    render() {
        if (this.state.modo === Modo.MODO_ALTA 
            || this.state.modo === Modo.MODO_EDICION) {
            return this.render_edicion();
        } else {
            return this.render_consulta();
        }
    }

    render_consulta() {
        let filas;
        if (this.state.entrenamientos.length > 0) {
            filas = this.state.entrenamientos.map(e => {
                return <tr key={e.numero}>
                    <td>{e.numero}</td>
                    <td>{Util.extraerFechaDeUTC(e.fecha)}</td>
                    <td>{e.tipo}</td>
                    <td>{e.volumenTotal}</td>
                    <td>
                        <button type='button' onClick={this.editar}>Modificar</button>
                        <button type='button' onClick={this.eliminar}>Eliminar</button>
                    </td>
                </tr>
            });
        } else {
            filas = <tr>
                <td colspan="5">
                    No hay entrenamientos
                </td>
            </tr>
        }
        return (
            <>
                <h2>Mantenimiento de Entrenamientos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Volumen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={5}>
                            <button type='button' onClick={this.agregar}>Nuevo</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    render_edicion() {
        return <div>Falta desarrollar</div>
    }

    agregar()  {

    }

    editar() {

    }

    eliminar() {

    }

}

export default Entrenamientos;