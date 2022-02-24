import React from 'react';
import axios from 'axios';
import './ejercicios.css';

class Ejercicios extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            ejercicios : []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3001/ejercicios")
            .then(res => {
                console.log(res);
                this.setState({
                    ejercicios : res.data
                })
            })
    }

    render() {
        let filas;
        if (this.state.ejercicios.length>0) {
            filas = this.state.ejercicios.map(ej => {
                    return (
                        <tr key={ej.codigo}>
                            <td>{ej.codigo}</td>
                            <td>{ej.nombre}</td>
                            <td>{ej.descripcion}</td>
                        </tr>
                    )
                }
            );
        } else {
            filas = (
                <tr key={0}>
                    <td colSpan={3}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {filas}
                    </tbody>
                </table>
            </>
        )
    }

}

export default Ejercicios;