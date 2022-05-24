import React from 'react';
import Modo from '../modos';
import enviroment from '../../enviroment';
import axios from 'axios';
import Util from '../utils';
import Entrenamiento from '../../model/entrenamiento';
import EjercicioRealizado from '../../model/ejercicioRealizado';

class Entrenamientos extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entrenamientos : [],
            ejercicios: [],
            current: null,
            modo: Modo.MODO_CONSULTA
        }
        this.agregar = this.agregar.bind(this);
        this.editar = this.editar.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.consulta = this.consulta.bind(this);
        this.agregarSerie = this.agregarSerie.bind(this);
        this.agregarEjercicio = this.agregarEjercicio.bind(this);
        this.guardar = this.guardar.bind(this);
        this.onChange = this.onChange.bind(this);
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
                <td colSpan="5">
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
        let filas = [];
        for (let i=0;i<this.state.filasDetalle;i++) {
            filas.push(i);
        }
        let series = [];
        for (let j=0;j<this.state.seriesDetalle;j++) {
            series.push(j);
        }
        let detalles = filas.map(i => {
            let seriesDetalle = series.map(
                j => <td key={j}>
                    <input type="number" onChange={this.onChange} size="5" id={'txtSerie_'+i+'_'+j} name="txtSerie_{i}_{j}"></input>
                </td>
            );
            return <tr key={i}>
                <td>
                    <select id={'txtEjercicio_'+i} name="txtEjercicio_{i}"
                         onChange={this.onChange}>
                        <option>Seleccione...</option>
                        {this.state.ejercicios.map(e => {
                            return <option key={e.id} value={e.id}>{e.nombre}</option>
                        })}
                    </select>
                </td>
                {seriesDetalle}
                <td>
                    <select id={'txtUnidad_'+i} name="txtUnidad_{i}"
                         onChange={this.onChange}>
                        <option value="Rep">Repeticiones</option>
                        <option value="Seg">Segundos</option>
                    </select>
                </td>
            </tr>
        });
        return (<>
            <h2>Mantenimiento de Entrenamientos - {this.state.modo===Modo.MODO_ALTA?'Agregar':'Editar'}</h2>
            <form>
                <input type="hidden" id="txtId" name="txtId" defaultValue={this.state.current.id}></input>
                <input type="number" id="txtNumero" name="txtNumero" onChange={this.onChange} placeholder='Número de entreno' defaultValue={this.state.current.numero}></input>
                <input type="date" id="txtFecha" name="txtFecha" onChange={this.onChange} placeholder="Fecha" defaultValue={this.state.current.fecha}></input>
                <input type="text" id="txtTipo" name="txtTipo" onChange={this.onChange} placeholder="Tipo de entreno" defaultValue={this.state.current.tipo}></input>
                <table>
                    <thead>
                    <tr>
                        <th>Ejercicio</th>
                        {series.map(j => <th key={j}>Serie {j+1}</th>)}
                        <th>Unidad Series</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detalles}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={this.state.seriesDetalle+2}>
                        <button type="button" onClick={this.agregarSerie}>+ Series</button>
                        <button type="button" onClick={this.agregarEjercicio}>+ Ejercicios</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" onClick={this.guardar}>Guardar</button>
                <button type='button' onClick={this.consulta}>Cancelar</button>
            </form>
        </>)
    }

    agregar()  {
        axios.get(enviroment.api_url+'ejercicios')
            .then(res => 
                this.setState({
                    ejercicios: res.data,
                    current : new Entrenamiento(),
                    modo: Modo.MODO_ALTA,
                    filasDetalle: 1,
                    seriesDetalle: 4
                }))
            .catch(error => {
                console.log(error);
                this.setState({
                    ejercicios: [],
                    current : new Entrenamiento(),
                    modo: Modo.MODO_ALTA,
                    filasDetalle: 1,
                    seriesDetalle: 4
                })
            })
    }

    editar() {

    }

    eliminar() {

    }

    agregarSerie() {
        this.setState(prevState => {
            return {
                ejercicios: prevState.ejercicios,
                current : prevState.current,
                modo: prevState.modo,
                filasDetalle: prevState.filasDetalle,
                seriesDetalle: prevState.seriesDetalle+1
            }
        })
    }

    agregarEjercicio() {
        this.setState(prevState => {
            return {
                ejercicios: prevState.ejercicios,
                current : prevState.current,
                modo: prevState.modo,
                filasDetalle: prevState.filasDetalle+1,
                seriesDetalle: prevState.seriesDetalle
            }
        })
    }

    guardar() {
        if (this.state.modo === Modo.MODO_ALTA) {
            console.log(this.state.current);
            axios.post(enviroment.api_url+"entrenamientos", this.state.current)
                .then(res => {
                        alert("El entrenamiento ha sido guardado");
                        this.consulta();
                    });
        }
    }

    onChange() {
        let ejercicios = [];
        for (let i=0;i<this.state.filasDetalle;i++) {
            let series = [];
            for (let j=0;j<this.state.seriesDetalle;j++) {
                let idSerie="txtSerie_"+i+"_"+j;
                if (document.getElementById(idSerie).value!='') {
                    series.push(document.getElementById(idSerie).value);
                }
            }
            let ejercicio = new EjercicioRealizado(
                document.getElementById("txtEjercicio_"+i).value,
                series,
                document.getElementById("txtUnidad_"+i).value
            );
            ejercicios.push(ejercicio);
        }
        this.setState({
            current: {
                id: document.getElementById("txtId").value,
                numero: document.getElementById("txtNumero").value,
                fecha: document.getElementById("txtFecha").value,
                tipo: document.getElementById("txtTipo").value,
                ejercicios: ejercicios
            }
        })
    }

}

export default Entrenamientos;