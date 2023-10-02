import "./App.scss"
import "./App.css"
import 'animate.css';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/userContext";
import Nav from './components/nav'
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import User from "./pages/user";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import QuizHome from "./pages/quiz-home";
import Quiz from "./pages/quiz";

function App() {
  const userState = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userState);


  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path={"/pokemon/:id"} element={<Pokemon />} />
          <Route path={"/quizes"} element={<QuizHome />} />
          <Route path={"/quizes/:id"} element={<Quiz />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
