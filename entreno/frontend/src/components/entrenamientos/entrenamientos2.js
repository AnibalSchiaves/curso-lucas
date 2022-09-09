import React, { useState } from "react"
import Util from "../utils";
import axios from "axios";
import enviroment from "../../enviroment";
import Entrenamiento from "../../model/entrenamiento";
import './entrenamientos.css';
import { useEffect } from "react";
import EjercicioRealizado from "../../model/ejercicioRealizado";
import CheckAuthContext from "../../checkauthcontext";

export default function Entrenamientos2  () {
    const MODO_CONSULTA = "consulta";
    const MODO_ALTA = "alta";
    const MODO_EDICION = "edicion";

    const [entrenamientos, setEntrenamientos] = useState([])
    const [modo, setModo] = useState (MODO_CONSULTA)
    const [current, setCurrent] = useState({})
    const [ejercicios, setEjercicios] = useState([])
    const [mes, setMes] = useState(Util.getMesActual())
    const [anio, setAnio] = useState(Util.getAnioActual())
    const [seriesDetalle, setSeriesDetalle] = useState(0)
    const [filasDetalle, setFilasDetalle] = useState(0)

    const consulta = () => {
        let params = "?anio="+anio+"&mes="+mes;
        axios.get(enviroment.api_url+'entrenamientos'+params)
            .then(res => {
                setEntrenamientos(res.data)
                setModo(MODO_CONSULTA)
            });
    }

    const editar = (e) => {
        axios.get(enviroment.api_url+"entrenamientos/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        setCurrent(res.data);
                        setModo(MODO_EDICION);
                    } else {
                        alert("Hubo un error al obtener el entrenamiento");
                    }
                });
    }

    const eliminar = (e) => {
        if (window.confirm("Esta seguro de eliminar el entrenamiento")) {
            axios.delete(enviroment.api_url+"entrenamiento/"+e.target.getAttribute("data-id"))
                .then(res => {
                    if (res.status===200) {
                        alert("El entrenamiento ha sido borrado");
                        consulta();
                    } else {
                        alert("Hubo un error al borrar el entrenamiento");
                    }
                });
        }
    }

    const agregar = () => {
        setCurrent(new Entrenamiento())
        setModo(MODO_ALTA);
    }

    useEffect(
        () => {
            console.log("se va a ejecutar el efecto");
            if (modo === MODO_CONSULTA) {
                console.log("se va a llamar a la api");
                axios.get(enviroment.api_url+"entrenamientos")
                .then(res => {
                    setEntrenamientos(res.data);
                });
            }
        }, [modo]
    );

    const render_consulta = () => {
        let filas;
        if (entrenamientos.length > 0) {
            filas = entrenamientos.map(e => {
                return <tr key={e.numero}>
                    <td>{e.numero}</td>
                    <td>{Util.extraerFechaDeUTC(e.fecha)}</td>
                    <td>{e.tipo}</td>
                    <td>{e.volumenTotal}</td>
                    <td>{e.duracionMinutos}</td>
                    <td>
                        <button type='button' data-id={e.id} onClick={editar}>Modificar</button>
                        <button type='button' data-id={e.id} onClick={eliminar}>Eliminar</button>
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
                <h2>Mantenimiento de Entrenamientos</h2>
                <div className="filtros">
                    <label>Año</label>
                    <input type="text" size={5} onChange={onChangeFiltro} defaultValue={anio} id="txtAnio" />
                    <label> Mes</label>
                    <select id="txtMes" onChange={onChangeFiltro} defaultValue={mes}>
                        <option value={1}>Enero</option>
                        <option value={2}>Febrero</option>
                        <option value={3}>Marzo</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Mayo</option>
                        <option value={6}>Junio</option>
                        <option value={7}>Julio</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Septiembre</option>
                        <option value={10}>Octubre</option>
                        <option value={11}>Noviembre</option>
                        <option value={12}>Diciembre</option>
                    </select>
                    <input type="button" id="btnBuscar" onClick={consulta} value="Buscar"></input>
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
                            <button type='button' onClick={agregar}>Nuevo</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    const onChangeFiltro = () => {
        setAnio(document.getElementById("txtAnio").value)
        setMes(document.getElementById("txtMes").value)
    }

    function render_edicion() {
        //Determino series máximas
        let maxSeries = 0;
        current.ejercicios.forEach(ej => {
            if (ej.series.length>maxSeries)
                maxSeries = ej.series.length;
        });
        if (seriesDetalle>maxSeries)
            maxSeries = seriesDetalle;
        let detallesEdicion = detallesEdicion(maxSeries);
        let detalles = detallesAgregados();
        let series = [];
        for (let j=0;j<seriesDetalle;j++) {
            series.push(j);
        }
        return (<>
            <h2>Mantenimiento de Entrenamientos - {modo===MODO_ALTA?'Agregar':'Editar'}</h2>
            <form>
                <input type="hidden" id="txtId" name="txtId" defaultValue={current.id}></input>
                <input type="number" id="txtNumero" name="txtNumero" onChange={onChange} placeholder='Número de entreno' defaultValue={current.numero}></input>
                <input type="date" id="txtFecha" name="txtFecha" onChange={onChange} placeholder="Fecha" defaultValue={Util.extraerFechaISO8601DeUTC(current.fecha)}></input>
                <input type="text" id="txtTipo" name="txtTipo" onChange={onChange} placeholder="Tipo de entreno" defaultValue={current.tipo}></input>
                <input type="number" id="txtDuracionMinutos" name="txtDuracionMinutos" onChange={onChange} placeholder='Duración en minutos' defaultValue={current.duracionMinutos}></input>
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
                        <td colSpan={seriesDetalle+2}>
                        <button type="button" onClick={agregarSerie}>+ Series</button>
                        <button type="button" onClick={agregarEjercicio}>+ Ejercicios</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" onClick={guardar}>Guardar</button>
                <button type='button' onClick={consulta}>Cancelar</button>
            </form>
        </>)
    }

    function detallesEdicion(maxSeries) {
        //Armo detalles si estoy editando
        let detallesEdicion = current.ejercicios.map((ej,i) => {
            let seriesDetalle = ej.series.map(
                (serie,j) => <td key={j}>
                    <input type="number" onChange={onChange} size="5" id={'txtSerie_'+i+'_'+j} defaultValue={serie} name="txtSerie_{i}_{j}"></input>
                </td>
            );
            let difSeries = maxSeries-ej.series.length;
            let seriesVacia = [];
            for (let k=0;k<difSeries;k++) {
                seriesVacia.push(k);    
            }
            let seriesDetalleVacias = seriesVacia.map(k => <td key={k+ej.series.length}>
                    <input type="number" onChange={onChange} size="5" id={'txtSerie_'+i+'_'+(k+ej.series.length)} name="txtSerie_{i}_{k+ej.series.length}"></input>
                </td>
            );
            return <tr key={i}>
                <td>
                    <select id={'txtEjercicio_'+i} name="txtEjercicio_{i}"
                         defaultValue={ej.ejercicio}
                         onChange={onChange}>
                        <option>Seleccione...</option>
                        {ejercicios.map(e => {
                            return <option key={e.id} value={e.id}>{e.nombre}</option>
                        })}
                    </select>
                </td>
                {seriesDetalle}
                {seriesDetalleVacias}
                <td>
                    <select id={'txtUnidad_'+i} name="txtUnidad_{i}"
                         defaultValue={ej.unidad}
                         onChange={onChange}>
                        <option value="Rep">Repeticiones</option>
                        <option value="Seg">Segundos</option>
                    </select>
                </td>
            </tr>
        });
        return detallesEdicion;
    }

    function detallesAgregados() {
        //armo detalles agregados (no guardados todavía)
        let filas = [];
        let cantFilas = filasDetalle;
        cantFilas -= current.ejercicios.length; 
        for (let i=0;i<cantFilas;i++) {
            filas.push(i+current.ejercicios.length);
        }
        let series = [];
        for (let j=0;j<seriesDetalle;j++) {
            series.push(j);
        }
        let detalles = filas.map(i => {
            let seriesDetalle = series.map(
                j => <td key={j}>
                    <input type="number" onChange={onChange} size="5" id={'txtSerie_'+i+'_'+j} name="txtSerie_{i}_{j}"></input>
                </td>
            );
            return <tr key={i}>
                <td>
                    <select id={'txtEjercicio_'+i} name="txtEjercicio_{i}"
                         onChange={onChange}>
                        <option>Seleccione...</option>
                        {ejercicios.map(e => {
                            return <option key={e.id} value={e.id}>{e.nombre}</option>
                        })}
                    </select>
                </td>
                {seriesDetalle}
                <td>
                    <select id={'txtUnidad_'+i} name="txtUnidad_{i}"
                         onChange={onChange}>
                        <option value="Rep">Repeticiones</option>
                        <option value="Seg">Segundos</option>
                    </select>
                </td>
            </tr>
        });
        return detalles;
    }

    const onChange = () => {
        let ejercicios = [];
        for (let i=0;i<filasDetalle;i++) {
            let series = [];
            for (let j=0;j<seriesDetalle;j++) {
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
        setCurrent({
            id: document.getElementById("txtId").value,
            numero: document.getElementById("txtNumero").value,
            fecha: document.getElementById("txtFecha").value,
            tipo: document.getElementById("txtTipo").value,
            duracionMinutos: document.getElementById("txtDuracionMinutos").value,
            ejercicios: ejercicios
        })
    }

    const guardar = () => {
        if (modo === MODO_ALTA) {
            axios.post(enviroment.api_url+"entrenamientos", current)
                .then(res => {
                        alert("El entrenamiento ha sido guardado");
                        consulta();
                    }); 
        } else if (modo === MODO_EDICION) {
            axios.put(enviroment.api_url+"entrenamientos/"+current.id, current)
                .then(res => {
                        alert("El entrenamiento ha sido guardado");
                        consulta();
                    }); 
        }
    }

    const agregarSerie = () => {
        setSeriesDetalle(seriesDetalle+1)
    }

    const agregarEjercicio = () => {
        setFilasDetalle(filasDetalle+1)
    }

    if (modo === MODO_ALTA 
        || modo === MODO_EDICION) {
        return render_edicion();
    } else {
        return render_consulta();
    }
}