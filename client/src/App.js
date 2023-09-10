import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Login from './pages/login';
import Register from './pages/register';
import User from './pages/user';
import Pokedex from './pages/pokedex';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </div>
  );
}

export default App;
