import React, { useEffect, useState } from "react";
import PokemonCard from "../components/pokemon-card";
import img from "../imgs/pokemon2.png"

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
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
      <div className="content"></div>
      <img src={img} alt="" />
      {pokemonList.map((pokemon) => {
        return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
      })}
    </div>
  ) : (
    <div className="loading">
      <div className="loading-content">
        <p>Loading</p>
        <div className="o-pokeball c-loader u-tada"></div>
      </div>
    </div>
  );
};

export default Pokedex;
