import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import EvoCard from "./evo-card";

const FooterEvolutionChain = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeArray, setPokeArray] = useState([]);
  const [isHidden, setIsHidden] = useState(props.hide)

  async function getPokemon(url) {
    const data = await fetch(url);
    return data.json();
  }

  useEffect(() => {
    setPokeArray((prev) => {
        return []
    })
    if(props.evoChain)
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

  useEffect(() => {
    console.log(props.hide, "evo hidden")
}, [props.hide])

  return (
    <>
      {!isLoading && (
        <div className={`small-inner ${props.type}`}>
        <div className="back-nav">
          <div
            className="back-button"
            onClick={() => props.setIsEvoOpen((prev) => !prev)}
          >
            <IoIosArrowBack />
            <span>{`${
              props.name.charAt(0).toUpperCase() + props.name.slice(1)
            } #${props.id}`}</span>
          </div>
        </div>
        <div className={`evolution-chain-container`}>
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
      </div>
      )}
      {isLoading && <h1 className="dark-text">No</h1>}
    </>
  );
};

export default FooterEvolutionChain;
