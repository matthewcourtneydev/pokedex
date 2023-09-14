import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Favorite from "../components/favorite";

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  }

  useEffect(() => {
    getPokemon().then((data) => {
      setPokemon(data);
    });
  }, []);

  return pokemon ? (
    <div className="pokemon-page">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={`${pokemon.name} image`} />
      <Favorite />
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Pokemon;
