import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import UsersList from './components/UsersList';
import {NavLink} from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Recuperatorio Modelos Computacionales de Gestión Administrativa</h1>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route> 
          <Route path="/home" element={<Home />}></Route> 
          <Route path="/usuarios" element={<PrivateRoute><UsersList/></PrivateRoute>}></Route>
          <Route path="/usuarios/:id" element={<UsersList />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <footer className='App-footer'>
        <span>Realizado por Anibal Schiaves</span>
      </footer>
    </div>
  );
}

export default App;
