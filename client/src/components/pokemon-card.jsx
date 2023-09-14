import React, { useEffect, useState } from "react";

const PokemonCard = (props) => {
const [pokemon, setPokemon] = useState()

  async function getPokemon() {
    const response = await fetch(props.pokemon.url);
    return response.json();
  }

  useEffect(() => {
    getPokemon().then((data) => {
      setPokemon(data);
      console.log(pokemon)
    });
  }, []);


  return (pokemon ? (
    <div className="poke-card">
    <img src={pokemon.sprites.front_default} alt={`${pokemon.name} image`} />
    <strong>
      <p>Name: {props.pokemon.name}</p>
    </strong>
  </div>
  ) : (
    <h1>Loading</h1>
  )
  );
};

export default PokemonCard;
