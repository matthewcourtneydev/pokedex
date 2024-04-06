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
  const [searchInput, setSearchInput] = useState(null);
  const [pokemonToGetGroup, setPokemonToGetGroup] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("mdc_pokdex_favorite_list")) || {"favorites" : []});
  const [secondaryCriteria, setSecondaryCriteria] = useState(null);
  // const [searchBarInput, setSearchBarInput] = useState(null);

  function finalizeSearch(array) {
    setPokemonToGetGroup((prev) => {
      return array;
    })
  }

  const selectSearch = (criteria) => {
    setSearchCriteria((prev) => criteria);
  };

  const updateInput = (input) => {
    let filteredList = pokemonToGetGroup.filter((pokemon) => {
      if (pokemon.pokemon) {
        if (pokemon.pokemon.name.includes(input)) {
          return pokemon
        }
      } else if (pokemon.pokemon_species) {
        if (pokemon.pokemon_species.name.includes(input)) {
          return pokemon
        }
      }
    })

    setPokemonToGetGroup((prev) => {
      return [...filteredList]
    })
  }

  useEffect(() => {
    console.log(searchCriteria)
  }, [searchCriteria]);


  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home finalizeSearch={finalizeSearch} pokemonToGetGroup={pokemonToGetGroup} searchInput={searchInput} setSearchInput={setSearchInput} setSearchCriteria={setSearchCriteria} setExpectedDataLength={setExpectedDataLength} favorites={favorites} updateInput={updateInput} selectSearch={selectSearch} searchCriteria={searchCriteria}/>} />
        <Route path={"/search"} element={<Search setSecondaryCriteria={setSecondaryCriteria} setExpectedDataLength={setExpectedDataLength} searchInput={searchInput} setSearchInput={setSearchInput} searchCriteria={searchCriteria} finalizeSearch={finalizeSearch} pokemonToGetGroup={pokemonToGetGroup}/>} />
        <Route path={"/pokedex"} element={<Pokedex searchInput={searchInput} setSearchInput={setSearchInput} secondaryCriteria={secondaryCriteria} searchCriteria={searchCriteria} currentPokemon={currentPokemon} setCurrentPokemon={setCurrentPokemon} expectedDataLength={expectedDataLength} pokemonToGetGroup={pokemonToGetGroup} setExpectedDataLength={setExpectedDataLength}/>} />
        <Route path={"/pokemon"} element={<Pokemon setFavorites={setFavorites} favorites={favorites} setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon} />} />
      </Routes>
    </div>
  );
}

export default App;
