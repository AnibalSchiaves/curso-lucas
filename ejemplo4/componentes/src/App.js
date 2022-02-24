import logo from './logo.svg';
import './App.css';
import Mensaje from './components/Mensaje';
import MensajeSimple from './components/MensajeSimple';
import RandomNumber from './components/RandomNumber';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Mensaje></Mensaje>
        <Mensaje nombre="Aníbal"></Mensaje>
        <MensajeSimple nombre="Aníbal"></MensajeSimple>
        <RandomNumber></RandomNumber>
      </header>
    </div>
  );
}

export default App;
