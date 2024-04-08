import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokedexCard from "../components/pokedex-card";
import Nav from "../components/nav";
import Searchbar from "../components/searchbar";

const Pokedex = (props) => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([])
  const [dataPresent, setDataPresent] = useState(false);
  const [input, setInput] = useState(props.searchInput);
  const navigate = useNavigate();

  function selectPokemon(pokemon) {
    props.setPrevPage((prev) => "/pokedex")
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

  async function getAllData2(array) {
    console.log(array);
    let fullfilledArray = [];
    for (let pokemon of array) {
      await getPokemonData(pokemon.url).then((data) => {
        fullfilledArray.push(data)
      })
    }
    
    setData(fullfilledArray);
    setFilteredArray((prev) => fullfilledArray);
  }

  useEffect(() => {
    if (props.isFavFlow) {
      props.setPrevPage((prev) => "/")
    } else {
      props.setPrevPage((prev) => "/search");
    }
    getAllData2(props.pokemonToGetGroup);
  }, []);

  useEffect(() => {
    if(input) {
      setFilteredArray(pokemonArray.filter((pokemon) => {
        return pokemon.name.includes(input)
      }))

    }
  }, [input]);

  useEffect(() => {
    if (pokemonArray.length) {
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
          prevPage={props.prevPage}
          setSecondaryCriteria={props.setSecondaryCriteria}
            data={{
              content: `${props.searchCriteria}${
                props.secondaryCriteria ? `: ${props.secondaryCriteria}` : ""
              }`, 
              
            }}
            additionalClasses={"dark-text"}
          />
          <div className="pokedex-inner">
            <Searchbar setInput={setInput} input={input} setSearchInput={props.setSearchInput}/>
            <div className="pokemon-list">
              {filteredArray
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
