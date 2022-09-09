import React from 'react';
import Modo from '../modos';
import enviroment from '../../enviroment';
import axios from 'axios';
import Util from '../utils';
import Entrenamiento from '../../model/entrenamiento';
import EjercicioRealizado from '../../model/ejercicioRealizado';
import './entrenamientos.css';
import CheckAuthContext from '../../checkauthcontext';
import NavBar from '../navbar/navbar';

class Entrenamientos extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entrenamientos : [],
            ejercicios: [],
            current: null,
            modo: Modo.MODO_CONSULTA,
            mes: Util.getMesActual(),
            anio: Util.getAnioActual()
        }
        this.agregar = this.agregar.bind(this);
        this.editar = this.editar.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.consulta = this.consulta.bind(this);
        this.agregarSerie = this.agregarSerie.bind(this);
        this.agregarEjercicio = this.agregarEjercicio.bind(this);
        this.guardar = this.guardar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeFiltro = this.onChangeFiltro.bind(this);
    }

    componentDidMount() {
        this.consulta();
    }

    consulta() {
        let params = "?anio="+this.state.anio+"&mes="+this.state.mes;
        axios.get(enviroment.api_url+'entrenamientos'+params)
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
                    <td>{e.duracionMinutos}</td>
                    <td>
                        <button type='button' data-id={e.id} onClick={this.editar}>Modificar</button>
                        <button type='button' data-id={e.id} onClick={this.eliminar}>Eliminar</button>
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
                <CheckAuthContext></CheckAuthContext>
                <NavBar></NavBar>
                <h2>Mantenimiento de Entrenamientos</h2>
                <div className="filtros">
                    <label>Año</label>
                    <input type="text" size={5} onChange={this.onChangeFiltro} defaultValue={this.state.anio} id="txtAnio" />
                    <label> Mes</label>
                    <select id="txtMes" onChange={this.onChangeFiltro} defaultValue={this.state.mes}>
                        <option value={1}>Enero</option>
                        <option value={2}>Febrero</option>
                        <option value={3}>Marzo</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Mayo</option>
                        <option value={6}>Junio</option>
                        <option value={7}>Julio</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Septiembre</option>
                        <option value={10}>Noviembre</option>
                        <option value={11}>Diciembre</option>
                    </select>
                    <input type="button" id="btnBuscar" onClick={this.consulta} value="Buscar"></input>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Volumen</th>
                            <th>Duración (min)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={6}>
                            <button type='button' onClick={this.agregar}>Nuevo</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    detallesEdicion(maxSeries) {
        //Armo detalles si estoy editando
        let detallesEdicion = this.state.current.ejercicios.map((ej,i) => {
            let seriesDetalle = ej.series.map(
                (serie,j) => <td key={j}>
                    <input type="number" onChange={this.onChange} size="5" id={'txtSerie_'+i+'_'+j} defaultValue={serie} name="txtSerie_{i}_{j}"></input>
                </td>
            );
            let difSeries = maxSeries-ej.series.length;
            let seriesVacia = [];
            for (let k=0;k<difSeries;k++) {
                seriesVacia.push(k);    
            }
            let seriesDetalleVacias = seriesVacia.map(k => <td key={k+ej.series.length}>
                    <input type="number" onChange={this.onChange} size="5" id={'txtSerie_'+i+'_'+(k+ej.series.length)} name="txtSerie_{i}_{k+ej.series.length}"></input>
                </td>
            );
            return <tr key={i}>
                <td>
                    <select id={'txtEjercicio_'+i} name="txtEjercicio_{i}"
                         defaultValue={ej.ejercicio}
                         onChange={this.onChange}>
                        <option>Seleccione...</option>
                        {this.state.ejercicios.map(e => {
                            return <option key={e.id} value={e.id}>{e.nombre}</option>
                        })}
                    </select>
                </td>
                {seriesDetalle}
                {seriesDetalleVacias}
                <td>
                    <select id={'txtUnidad_'+i} name="txtUnidad_{i}"
                         defaultValue={ej.unidad}
                         onChange={this.onChange}>
                        <option value="Rep">Repeticiones</option>
                        <option value="Seg">Segundos</option>
                    </select>
                </td>
            </tr>
        });
        return detallesEdicion;
    }

    detallesAgregados() {
        //armo detalles agregados (no guardados todavía)
        let filas = [];
        let cantFilas = this.state.filasDetalle;
        cantFilas -= this.state.current.ejercicios.length; 
        for (let i=0;i<cantFilas;i++) {
            filas.push(i+this.state.current.ejercicios.length);
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
        return detalles;
    }

    render_edicion() {
        //Determino series máximas
        let maxSeries = 0;
        this.state.current.ejercicios.forEach(ej => {
            if (ej.series.length>maxSeries)
                maxSeries = ej.series.length;
        });
        if (this.state.seriesDetalle>maxSeries)
            maxSeries = this.state.seriesDetalle;
        let detallesEdicion = this.detallesEdicion(maxSeries);
        let detalles = this.detallesAgregados();
        let series = [];
        for (let j=0;j<this.state.seriesDetalle;j++) {
            series.push(j);
        }
        return (<>
            <NavBar></NavBar>
            <h2>Mantenimiento de Entrenamientos - {this.state.modo===Modo.MODO_ALTA?'Agregar':'Editar'}</h2>
            <form>
                <input type="hidden" id="txtId" name="txtId" defaultValue={this.state.current.id}></input>
                <input type="number" id="txtNumero" name="txtNumero" onChange={this.onChange} placeholder='Número de entreno' defaultValue={this.state.current.numero}></input>
                <input type="date" id="txtFecha" name="txtFecha" onChange={this.onChange} placeholder="Fecha" defaultValue={Util.extraerFechaISO8601DeUTC(this.state.current.fecha)}></input>
                <input type="text" id="txtTipo" name="txtTipo" onChange={this.onChange} placeholder="Tipo de entreno" defaultValue={this.state.current.tipo}></input>
                <input type="number" id="txtDuracionMinutos" name="txtDuracionMinutos" onChange={this.onChange} placeholder='Duración en minutos' defaultValue={this.state.current.duracionMinutos}></input>
                <table>
                    <thead>
                    <tr>
                        <th>Ejercicio</th>
                        {series.map(j => <th key={j}>Serie {j+1}</th>)}
                        <th>Unidad Series</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detallesEdicion}
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

    editar(e) {
        const rq1 = axios.get(enviroment.api_url+'ejercicios');
        const rq2 = axios.get(enviroment.api_url+'entrenamientos/'+e.target.getAttribute("data-id"));
        axios.all([rq1, rq2])
            .then(axios.spread((...responses) => {
                const res1 = responses[0];
                const res2 = responses[1];
                let maxSeries = 0;
                for (let i=0;i<res2.data.ejercicios.length;i++) {
                    if (maxSeries<res2.data.ejercicios[i].series.length)
                        maxSeries = res2.data.ejercicios[i].series.length;
                }
                this.setState({
                    ejercicios: res1.data,
                    current : res2.data,
                    modo: Modo.MODO_EDICION,
                    filasDetalle: res2.data.ejercicios.length,
                    seriesDetalle: maxSeries
                });
            }))
            .catch(errors => {
                console.log(errors);
            });
    }

    eliminar(e) {
        if (window.confirm("Esta seguro de borrar el entrenamiento")) {
            axios.delete(enviroment.api_url+"entrenamientos/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        alert("El entrenamiento ha sido borrado");
                        this.consulta();
                    } else {
                        alert("Hubo un error al borrar el entrenamiento");
                    }
                });
        }
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
            axios.post(enviroment.api_url+"entrenamientos", this.state.current)
                .then(res => {
                        alert("El entrenamiento ha sido guardado");
                        this.consulta();
                    }); 
        } else if (this.state.modo === Modo.MODO_EDICION) {
            axios.put(enviroment.api_url+"entrenamientos/"+this.state.current.id, this.state.current)
                .then(res => {
                        alert("El entrenamiento ha sido guardado");
                        this.consulta();
                    }); 
        }
    }

    onChangeFiltro() {
        this.setState(prevState => {
            return {
                ejercicios: prevState.ejercicios,
                current : prevState.current,
                modo: prevState.modo,
                filasDetalle: prevState.filasDetalle,
                seriesDetalle: prevState.seriesDetalle,
                anio: document.getElementById("txtAnio").value,
                mes: document.getElementById("txtMes").value
            }
        })
    }

    onChange() {
        let ejercicios = [];
        for (let i=0;i<this.state.filasDetalle;i++) {
            let series = [];
            for (let j=0;j<this.state.seriesDetalle;j++) {
                let idSerie="txtSerie_"+i+"_"+j;
                if (document.getElementById(idSerie).value!=='') {
                    series.push(document.getElementById(idSerie).value);
                } else {
                    series.push('');
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
                duracionMinutos: document.getElementById("txtDuracionMinutos").value,
                ejercicios: ejercicios
            }
        })
    }

}

export default Entrenamientos;