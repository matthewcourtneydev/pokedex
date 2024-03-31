import { React, useEffect, useState } from "react";
import PokedexCard from "../components/pokedex-card";

const Pokedex = (props) => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [dataPresent, setDataPresent] = useState(false);

  async function getPokemonData(url) {
    const data = await fetch(url);
    return data.json();
  }

  function setData(data) {
    setPokemonArray((prev) => {
      return [...prev, data];
    });
  }

  useEffect(() => {
    props.pokemonToGetGroup.forEach((pokemon) => {
      getPokemonData(pokemon.pokemon.url).then((data) => {
        setData(data);
      });
    });
  }, []);

  useEffect(() => {
    if (pokemonArray.length === props.expectedDataLength) {
      console.log(pokemonArray);
      setDataPresent((prev) => {
        return true;
      });
    }
  }, [pokemonArray]);
  return (
    <>
      {dataPresent && pokemonArray.length === props.expectedDataLength && (
        <div className="page" id="pokedex">
          <div className="pokedex-inner">
            <div className="pokemon-list">
              {pokemonArray.map((pokemon) => (
                <PokedexCard pokemon={pokemon} />
              ))}
            </div>
          </div>
        </div>
      )}
      {!dataPresent && (
        <div className="page" id="pokedex">
          <h1>Loading</h1>
        </div>
      )}
    </>
  );
};

export default Pokedex;
