import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList';
import {NavLink} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Recuperatorio Modelos Computacionales de Gestión Administrativa</h1>
      </header>
      <BrowserRouter>
        <navbar>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/usuarios">Usuarios</NavLink></li>
          </ul>
        </navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route> 
          <Route path="/usuarios" element={<UsersList />}></Route>
          <Route path="/usuarios/:id" element={<UsersList />}></Route>
        </Routes>
      </BrowserRouter>
      <footer className='App-footer'>
        <span>Realizado por Anibal Schiaves</span>
      </footer>
    </div>
  );
}

export default App;
