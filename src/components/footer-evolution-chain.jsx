import React, { useEffect, useState } from "react";

const FooterEvolutionChain = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeArray, setPokeArray] = useState([]);

  async function getPokemon(url) {
    const data = await fetch(url);
    return data.json();
  }

  useEffect(() => {
    props.evoChain.forEach((pokemon) => {
      getPokemon(pokemon.url).then((data) => {
        setPokeArray((prev) => {
          return [...prev, data];
        });
      });
    });
  }, []);

  useEffect(() => {
    if (pokeArray.length === props.evoChain.length) {
      setIsLoading((prev) => {
        return false;
      });
    }
  }, [pokeArray]);
  return (
    <>
      {!isLoading && <div className="evolution-chain-container">
        {pokeArray.map((pokemon) => {
            return <div>{pokemon.name}</div>
        })}
        </div>}
      {isLoading && <h1 className="dark-text">No</h1>}
    </>
  );
};

export default FooterEvolutionChain;
