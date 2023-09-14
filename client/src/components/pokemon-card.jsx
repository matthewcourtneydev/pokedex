import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = (props) => {
const [pokemon, setPokemon] = useState();
const navigate = useNavigate();

  async function getPokemon() {
    const response = await fetch(props.pokemon.url);
    return response.json();
  }

  function redirectToPokemon() {
    const route = `/pokemon/${pokemon.id}`
    navigate(route)
  }


  useEffect(() => {
    getPokemon().then((data) => {
      setPokemon(data);
    });
  }, []);


  return (pokemon ? (
    <div className="poke-card" onClick={redirectToPokemon}>
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
