import React, { useEffect, useState } from "react";
import PokemonCard from "../components/pokemon-card";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    return response.json();
  }

  useEffect(() => {
    getPokemon().then((data) => {
      setPokemonList(data.results);
    });
  }, []);

  return pokemonList.length ? (
    // <div id="pokemon-list">
    //   <PokemonCard pokemon={pokemonList[0]} />
    // </div>
    <div className="pokedex-page page">
    {pokemonList.map((pokemon) => {
      return <PokemonCard key={pokemon.name} pokemon={pokemon} />
    })}
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Pokedex;
