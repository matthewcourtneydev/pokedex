import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Favorite from "../components/favorite";

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const userData = useContext(UserContext);

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  }

  console.log(pokemon);

  useEffect(() => {
    getPokemon().then((data) => {
      setPokemon(data);
    });
  }, []);

  return pokemon ? (
    <div className="pokemon-page page">
      <div className="header-pokemon">
        <h2>{pokemon.name}</h2>
        {pokemon.stats.map((stat) => {
          if (stat.stat.name == "hp") {
            return <p>HP {stat.base_stat}</p>;
          }
        })}
      </div>
      <div className="square">

      </div>
      <img src={pokemon.sprites.front_default} alt={`${pokemon.name} image`} />

      {userData.user && userData.user.email ? <Favorite /> : <></>}
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Pokemon;
