import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login-google';
import Ejercicios from './components/ejercicios/ejercicios2';
import Entrenamientos from './components/entrenamientos/entrenamientos2';
import NavBar from './components/navbar/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthProvider from './authprovider';
import QuienesSomos from './components/quienesomos/quienessomos';
import Logout from './components/logout/logout-google';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Entrenamiento</h1>
      </header>
      <div className="content">
        <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/ejercicios" element={<Ejercicios />}></Route>
          <Route path="/ejercicios/nuevo" element={<Ejercicios />}></Route>
          <Route path="/ejercicios/editar/:id" element={<Ejercicios />}></Route>
          <Route path="/entrenamientos" element={<Entrenamientos />}></Route>
          <Route path="/quienessomos" element={<QuienesSomos/>}></Route>
          <Route path="/salir" element={<Logout/>}></Route>
          <Route path='*' element={<h2>No se encontró la página</h2>}></Route>
        </Routes>
        </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
