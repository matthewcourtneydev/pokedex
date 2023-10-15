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
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={`${pokemon.name} image`} />
    <strong>
      <div className="name-container">
      <p>{pokemon.id.toString().padStart(4, '0')}</p>
      <p className="pokemon-card-name">{pokemon.name.toUpperCase()}</p>
      </div>
    </strong>
  </div>
  ) : (
    <></>
  )
  );
};

export default PokemonCard;
