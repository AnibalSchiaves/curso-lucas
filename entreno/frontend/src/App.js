import logo from './logo.svg';
import './App.css';
import Ejercicios from './components/ejercicios/ejercicios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Entrenamiento</h1>
      </header>
      <div className="content">
        <Ejercicios></Ejercicios>
      </div>
    </div>
  );
}

export default App;
