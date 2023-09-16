import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Favorite from "../components/favorite";

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [desc, setDesc] = useState();
  const [evolutionChain, setEvolutionChain] = useState();
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  }

  function redirectPokemon(url) {
    navigate(url);
    window.location.reload();
  }

  async function getDesc() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    return response.json();
  }

  async function getChain(url) {
    const response = await fetch(url);
    return response.json();
  }
  console.log(evolutionChain);
  // console.log(pokemon);
  useEffect(() => {
    getPokemon().then((data) => {
      setPokemon(data);
      getDesc().then((data) => {
        setDesc(data);
      });
    });
  }, []);

  useEffect(() => {
    if (desc) {
      getChain(desc.evolution_chain.url).then((data) => {
        setEvolutionChain(data);
      });
    }
  }, [desc]);

  return pokemon && desc && evolutionChain ? (
    <div className="pokemon-page page">
      <div className="pokemon-img-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={`${pokemon.name} image`}
        />
        <strong>
          <p className="pokemon-name">{pokemon.name.toUpperCase()}</p>
        </strong>
      </div>
      <div className="stat-container">
        <ul>
          {pokemon.stats.map((stat) => {
            if (
              stat.stat.name !== "special-attack" &&
              stat.stat.name !== "special-defense"
            ) {
              return (
                <li className="stat">
                  <p className="stat-value">{stat.base_stat}</p>
                  <p className="stat-name">{stat.stat.name}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="description">
        <p>{desc.flavor_text_entries[0].flavor_text}</p>
        <br></br>
        <p>{desc.flavor_text_entries[2].flavor_text}</p>
      </div>

{evolutionChain && evolutionChain.chain.evolves_to.length ? (
  <div className="evolutions">
  <ul>
    <li className={evolutionChain.chain.species.name === pokemon.name ? "evo current" : "evo"} onClick={() => {redirectPokemon(`/pokemon/${evolutionChain.chain.species.url.split("/").at(-2)}`)}}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.species.url.split("/").at(-2)}.png`} alt="" />
      {evolutionChain.chain.species.name}
      </li>
  <li className={evolutionChain.chain.evolves_to[0].species.name === pokemon.name ? "evo current" : "evo"} onClick={() => {redirectPokemon(`/pokemon/${evolutionChain.chain.evolves_to[0].species.url.split("/").at(-2)}`)}}>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.evolves_to[0].species.url.split("/").at(-2)}.png`} alt="" />
      {evolutionChain.chain.evolves_to[0].species.name}
    </li>
  <li className={evolutionChain.chain.evolves_to[0].evolves_to[0].species.name === pokemon.name ? "evo current" : "evo"} onClick={() => {redirectPokemon(`/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split("/").at(-2)}`)}}>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split("/").at(-2)}.png`} alt="" />
      {evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}
    </li>
  </ul>
</div>
) : (<></>)}

      {userData.user && userData.user.email ? <Favorite /> : <></>}
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Pokemon;
