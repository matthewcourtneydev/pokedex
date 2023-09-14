import React, { useEffect } from "react";

const Pokedex = () => {
  let pokemonList = {};

  async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    return response.json();
  }

  useEffect(() => {
    getPokemon().then((data) => {
      pokemonList = data
    });
  }, []);



  return (
    <div id="pokemon-list">
        
    </div>
  )
};

export default Pokedex;
