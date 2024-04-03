import "./App.scss";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/home";
import Search from "./pages/search";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [expectedDataLength, setExpectedDataLength] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [pokemonToGetGroup, setPokemonToGetGroup] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("mdc_pokdex_favorite_list")) || {"favorites" : []});
  const [secondaryCriteria, setSecondaryCriteria] = useState(null)

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

  useEffect(() => {
    console.log(searchCriteria)
  }, [searchCriteria])

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home setSearchCriteria={setSearchCriteria} setExpectedDataLength={setExpectedDataLength} favorites={favorites} updateInput={updateInput} selectSearch={selectSearch} searchCriteria={searchCriteria} finalizeSearch={finalizeSearch}/>} />
        <Route path={"/search"} element={<Search setSecondaryCriteria={setSecondaryCriteria} setExpectedDataLength={setExpectedDataLength} searchInput={searchInput} searchCriteria={searchCriteria} finalizeSearch={finalizeSearch} pokemonToGetGroup={pokemonToGetGroup}/>} />
        <Route path={"/pokedex"} element={<Pokedex secondaryCriteria={secondaryCriteria} searchCriteria={searchCriteria} currentPokemon={currentPokemon} setCurrentPokemon={setCurrentPokemon} expectedDataLength={expectedDataLength} pokemonToGetGroup={pokemonToGetGroup}/>} />
        <Route path={"/pokemon"} element={<Pokemon setFavorites={setFavorites} favorites={favorites} setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon} />} />
      </Routes>
    </div>
  );
}

export default App;
