import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Ejercicios from './components/ejercicios/ejercicios2';
import Entrenamientos from './components/entrenamientos/entrenamientos';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Entrenamiento</h1>
      </header>
      <div className="content">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/ejercicios" element={<Ejercicios />}></Route>
          <Route path="/entrenamientos" element={<Entrenamientos />}></Route>
          <Route path='*' element={<h2>No se encontró la página</h2>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
