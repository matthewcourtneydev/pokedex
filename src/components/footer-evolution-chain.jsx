import React, { useEffect, useState } from "react";
import EvoCard from "./evo-card";

const FooterEvolutionChain = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeArray, setPokeArray] = useState([]);

  async function getPokemon(url) {
    const data = await fetch(url);
    return data.json();
  }

  useEffect(() => {
    setPokeArray((prev) => {
        return []
    })
    props.evoChain.forEach((pokemon) => {
      let id = pokemon.url.split("/")[6];
      getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((data) => {
        setPokeArray((prev) => {
          return [...prev, data];
        });
      });
    });
  }, [props.footerExpanded]);

  useEffect(() => {
    if (pokeArray.length === props.evoChain.length) {
      setIsLoading((prev) => {
        return false;
      });
    }
    console.log(pokeArray)
  }, [pokeArray]);


  return (
    <>
      {!isLoading && (
        <div className="evolution-chain-container">
          <h1>Evolutions</h1>
          {pokeArray
            .sort(function (a, b) {
              return a.id - b.id;
            })
            .map((pokemon, i) => {
              return (
                <EvoCard
                  isEnd={i === pokeArray.length - 1}
                  pokemon={pokemon}
                  pokeArray={pokeArray}
                />
              );
            })}
        </div>
      )}
      {isLoading && <h1 className="dark-text">No</h1>}
    </>
  );
};

export default FooterEvolutionChain;
