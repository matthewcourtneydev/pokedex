import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Favorite from "../components/favorite";
import trainer from "../imgs/ash.webp";

const Pokemon = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [attackCount, setAttackCount] = useState(10);
  const [isTrainerLarger, setIsTrainerLarger] = useState();
  const [desc, setDesc] = useState();
  const [evolutionChain, setEvolutionChain] = useState();
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const trainerHeight = 1.6;

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  }

  function showMoreAttacks() {
    setAttackCount(pokemon.moves.length);
  }

  function showLessAttacks() {
    setAttackCount(10);
  }

  function getCompareValues(pokeH) {
    const pokeHeight = pokeH / trainerHeight;
    const tHeight = trainerHeight / pokeH;
    const heights = {
      trainer: `${tHeight * 1000}%`,
      pokemon: `${pokeHeight * 10}%`,
    };
    return heights;
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

  // console.log(desc);
  // console.log(evolutionChain);
  console.log(pokemon);
  if (pokemon) {
    console.log((pokemon.height * 0.1).toFixed(1));
  }
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
        const isTrainerLarger =
          trainerHeight > (parseInt(pokemon.height) * 0.1).toFixed(1)
            ? true
            : false;
        console.log(isTrainerLarger);
      });
    }
  }, [desc]);

  useEffect(() => {
    if (pokemon && pokemon.height) {
      setIsTrainerLarger(
        trainerHeight > (parseInt(pokemon.height) * 0.1).toFixed(1)
      );
      console.log(isTrainerLarger);
    }
  }, [pokemon]);

  // const test = false;

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
        {userData.user && userData.user.email ? <Favorite /> : <></>}
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
      <div className="attributes">
        <div className="height-compare">
          <div className="compare-text">
            <p>Height Comparison</p>
          </div>
          {isTrainerLarger ? (
            <div className="height-compare-inner">
              <img
                src={trainer}
                alt=""
                className="trainer-height"
                height={"100%"}
              />
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={`${pokemon.name} image`}
                className="pokemon-height"
                height={getCompareValues(pokemon.height).pokemon}
              />
            </div>
          ) : (
            <div className="height-compare-inner height-compare-inner-large">
              <img
                src={trainer}
                alt=""
                className="trainer-height"
                height={getCompareValues(pokemon.height).trainer}
              />
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={`${pokemon.name} image`}
                className="pokemon-height-large"
                height={"100%"}
                styles={{ right: "-50px" }}
              />
            </div>
          )}
        </div>

        {/* <p>Height: {(parseInt(pokemon.height) * 0.1).toFixed(1)}m</p>
            <p>weight: {(parseInt(pokemon.weight) * 0.1).toFixed(1)}kg</p>
            {desc.genera.map((genre) => {
              if (genre.language.name === 'en') {
                return <p>Category: {genre.genus}</p>
              }
            })} */}
      </div>

      <div className="attacks">
        <h2>Attacks</h2>
        <div className="attack-container">
          <ul className={"closed"}>
            {pokemon.moves.slice(0, attackCount).map((move) => (
              <li>{move.move.name}</li>
            ))}
          </ul>
          {attackCount <= 10 ? (
            <button className="expand" onClick={showMoreAttacks}>
              Show More
            </button>
          ) : (
            <button className="expand" onClick={showLessAttacks}>
              Show Less
            </button>
          )}
        </div>
      </div>

      {evolutionChain && evolutionChain.chain.evolves_to.length ? (
        <div className="evolutions">
          <ul>
            <li
              className={
                evolutionChain.chain.species.name === pokemon.name
                  ? "evo current"
                  : "evo"
              }
              onClick={() => {
                redirectPokemon(
                  `/pokemon/${evolutionChain.chain.species.url
                    .split("/")
                    .at(-2)}`
                );
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.species.url
                  .split("/")
                  .at(-2)}.png`}
                alt=""
              />
              {evolutionChain.chain.species.name}
            </li>
            <li
              className={
                evolutionChain.chain.evolves_to[0].species.name === pokemon.name
                  ? "evo current"
                  : "evo"
              }
              onClick={() => {
                redirectPokemon(
                  `/pokemon/${evolutionChain.chain.evolves_to[0].species.url
                    .split("/")
                    .at(-2)}`
                );
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.evolves_to[0].species.url
                  .split("/")
                  .at(-2)}.png`}
                alt=""
              />
              {evolutionChain.chain.evolves_to[0].species.name}
            </li>
            {evolutionChain.chain.evolves_to[0].evolves_to.length ? (
              <li
                className={
                  evolutionChain.chain.evolves_to[0].evolves_to[0].species
                    .name === pokemon.name
                    ? "evo current"
                    : "evo"
                }
                onClick={() => {
                  redirectPokemon(
                    `/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.url
                      .split("/")
                      .at(-2)}`
                  );
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.url
                    .split("/")
                    .at(-2)}.png`}
                  alt=""
                />
                {evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      ) : (
        <div className="padding"></div>
      )}

      <div className="navigation-buttons">
        {parseInt(pokemon.id) <= 1 ? (
          <>
            <button className="id">
              {pokemon.id.toString().padStart(4, "0")}
            </button>
            <button
              className="next-one"
              onClick={() => {
                redirectPokemon(`/pokemon/${parseInt(pokemon.id) + 1}`);
              }}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <button
              className="prev"
              onClick={() => {
                redirectPokemon(`/pokemon/${parseInt(pokemon.id) - 1}`);
              }}
            >
              Prev
            </button>
            <button className="id">
              {pokemon.id.toString().padStart(4, "0")}
            </button>
            <button
              className="next"
              onClick={() => {
                redirectPokemon(`/pokemon/${parseInt(pokemon.id) + 1}`);
              }}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="loading">
      <div className="loading-content">
        <p>Loading</p>
      <div class="o-pokeball c-loader u-tada"></div>
      </div>

    </div>
  );
};

export default Pokemon;
