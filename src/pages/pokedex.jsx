import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokedexCard from "../components/pokedex-card";
import Nav from "../components/nav";
import Searchbar from "../components/searchbar";

const Pokedex = (props) => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [dataPresent, setDataPresent] = useState(false);
  const navigate = useNavigate();

  function selectPokemon(pokemon) {
    props.setCurrentPokemon((prev) => pokemon);
    navigate("/pokemon");
  }

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
      if (pokemon.pokemon) {
        getPokemonData(pokemon.pokemon.url).then((data) => {
          setData(data);
        });
      } else if(pokemon.pokemon_species) {
        let id = pokemon.pokemon_species.url.split("/")[6]
        getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((data) => {
          setData(data);
        });
      } else {
        getPokemonData(pokemon.url).then((data) => {
          setData(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (pokemonArray.length === props.expectedDataLength) {
      setDataPresent((prev) => {
        return true;
      });
    }
  }, [pokemonArray]);

  return (
    <>
      {dataPresent && pokemonArray.length === props.expectedDataLength && (
        <div className="page" id="pokedex">
          <Nav data={{ content:  `${props.searchCriteria}${props.secondaryCriteria ? `: ${props.secondaryCriteria}` : ""}`}} additionalClasses={"black"} />
          <div className="pokedex-inner">
            <Searchbar />
            <div className="pokemon-list">
              {pokemonArray
                .sort(function (a, b) {
                  return a.id - b.id;
                })
                .map((pokemon) => (
                  <PokedexCard
                    selectPokemon={selectPokemon}
                    pokemon={pokemon}
                    setCurrentPokemon={props.setCurrentPokemon}
                  />
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
