import React from "react";

class RandomNumber extends React.Component {

    constructor(args) {
        console.log('ejecutando contructor de RandomNumber');
        super(args);
        this.state = {
            numero : this.getNumero(),
            anterior: null
        };
    }

    componentWillMount() {
        console.log('ejecutando componentWillMount de RandomNumber');
    }

    componentDidMount() {
        console.log('ejecutando componentDidMount de RandomNumber');
    }

    getNumero() {
        let max = 100;
        let min = 1;
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    randomizar() {
        this.setState(
            prevState => {
                return {numero : this.getNumero(),
                    anterior : prevState.numero
                }
            }
        );
    }

    render() {
        console.log('ejecutando render de RandomNumber');
        return <div>
                <span>Antes {this.state.anterior}, ahora {this.state.numero}</span>
                <button type="button" onClick= {this.randomizar.bind(this)}>Regenerar</button>
            </div>
    }

    shouldComponentUpdate(nextProp, nextState) {
        console.log('ejecutando shouldComponentUpdate de RandomNumber');
        return true;
    }

    componentWillUpdate(nextProp, nextState) {
        console.log('ejecutando componentWillUpdate de RandomNumber');
    }

    componentDidUpdate(provProp, prevState) {
        console.log('ejecutando componentDidUpdate de RandomNumber');
    }
}

export default RandomNumber;