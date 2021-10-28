import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import Pie from './components/Pie';

function App() {
  const saludar = () => saludo.current.innerHTML = "Hola "+input.current.value;

  let input = useRef(null);
  let saludo = useRef(null);
  let [saludoIns, setSaludoIns] = useState('');

  const cambiar = (e) => {
    setSaludoIns('Hola '+e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Prueba con React</h1>
        <label>Ingrese su nombre</label><input type="text" ref={input}/>
        <button onClick={saludar}>Saludar</button>
        <div ref={saludo}></div>
        <p></p>
        <label>Ingrese su nombre para saludo instantáneo</label><input type="text" onChange={e => cambiar(e)}/>
        <div>{saludoIns}</div>
        <Pie creador="Aníbal Schiaves" resaltar={true}></Pie>
      </header>
    </div>
  );
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
