import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokedexCard from "../components/pokedex-card";
import Nav from "../components/nav";
import Searchbar from "../components/searchbar";

const Pokedex = (props) => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [dataPresent, setDataPresent] = useState(false);
  const [input, setInput] = useState(props.searchInput);
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
      return data;
    });
  }

  async function getAllData(array) {
    if (input) {
      setDataPresent((prev) => {
        return false;
      })
      let filteredArray = [];
      for (let pokemon of array) {
        if (pokemon.pokemon && pokemon.pokemon.name.includes(input)) {
          await getPokemonData(pokemon.pokemon.url).then((data) => {
            filteredArray = [...filteredArray, data];
          });
        } else if (
          pokemon.pokemon_species &&
          pokemon.pokemon_species.name.includes(input)
        ) {
          let id = pokemon.pokemon_species.url.split("/")[6];
          await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
            (data) => {
              filteredArray = [...filteredArray, data];
            }
          );
        } else if (pokemon.name && pokemon.name.includes(input)) {
          await getPokemonData(pokemon.url).then((data) => {
            filteredArray = [...filteredArray, data];
          });
        }
      }

      setData(filteredArray);

    } else {
      let filteredArray = [];
      for (let pokemon of array) {
        if (pokemon.pokemon) {
          await getPokemonData(pokemon.pokemon.url).then((data) => {
            filteredArray = [...filteredArray, data];
          });
        } else if (pokemon.pokemon_species) {
          let id = pokemon.pokemon_species.url.split("/")[6];
          await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
            (data) => {
              filteredArray = [...filteredArray, data];
            }
          );
        } else {
          await getPokemonData(pokemon.url).then((data) => {
            filteredArray = [...filteredArray, data];
          });
        }
      }

      setData(filteredArray)
    }
  }

  useEffect(() => {
    getAllData(props.pokemonToGetGroup);
  }, []);

  useEffect(() => {
    if(input) {
      getAllData(props.pokemonToGetGroup)
    }
  }, [input]);

  useEffect(() => {
    debugger;
    if (pokemonArray.length) {
      debugger
      setDataPresent((prev) => {
        return true;
      });
    }
  }, [pokemonArray]);


  return (
    <>
      {dataPresent && (
        <div className="page" id="pokedex">
          <Nav
            data={{
              content: `${props.searchCriteria}${
                props.secondaryCriteria ? `: ${props.secondaryCriteria}` : ""
              }`,
            }}
            additionalClasses={"black"}
          />
          <div className="pokedex-inner">
            <Searchbar setInput={setInput} input={input} setSearchInput={props.setSearchInput}/>
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
