import "./App.scss";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/home";
import Search from "./pages/search";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [pokemonToGetGroup, setPokemonToGetGroup] = useState("");

  const navigate = useNavigate()

  function finalizeSearch(array) {
    setPokemonToGetGroup((prev) => {
      return array;
    })
  }

  const selectSearch = (criteria) => {
    setSearchCriteria((prev) => criteria);
  };

  const updateInput = (input) => {
    setSearchInput((prev) => input)
  }

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home updateInput={updateInput} selectSearch={selectSearch} searchCriteria={searchCriteria}/>} />
        <Route path={"/search"} element={<Search searchInput={searchInput} searchCriteria={searchCriteria} finalizeSearch={finalizeSearch} pokemonToGetGroup={pokemonToGetGroup}/>} />
        <Route path={"/pokedex"} element={<Pokedex pokemonToGetGroup={pokemonToGetGroup}/>} />
        <Route path={"/pokemon"} element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
