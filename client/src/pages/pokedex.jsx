import React, { useEffect, useState } from "react";
import PokemonCard from "../components/pokemon-card";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    return response.json();
  }

  useEffect(() => {
    getPokemon().then((data) => {
      setPokemonList(data.results);
      console.log(pokemonList[0]);
    });
  }, []);

  return pokemonList.length ? (
    // <div id="pokemon-list">
    //   <PokemonCard pokemon={pokemonList[0]} />
    // </div>
    <>
    <h1>NOT LOADING</h1>
    {pokemonList.map((pokemon) => {
      return <PokemonCard pokemon={pokemon} />
    })}
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default Pokedex;
