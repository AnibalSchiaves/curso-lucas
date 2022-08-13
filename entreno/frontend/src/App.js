import logo from './logo.svg';
import './App.css';
import Ejercicios from './components/ejercicios/ejercicios2';
import Entrenamientos from './components/entrenamientos/entrenamientos2';
import NavBar from './components/navbar/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Entrenamiento</h1>
      </header>
      <div className="content">
        <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<h2>Bienvenido</h2>}></Route>
          <Route path="/ejercicios" element={<Ejercicios />}></Route>
          <Route path="/ejercicios/nuevo" element={<Ejercicios />}></Route>
          <Route path="/ejercicios/editar/:id" element={<Ejercicios />}></Route>
          <Route path="/entrenamientos" element={<Entrenamientos />}></Route>
          <Route path='*' element={<h2>No se encontró la página</h2>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
