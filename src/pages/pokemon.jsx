import { React, useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PokemonFooter from "../components/pokemon-footer";
import About from "../components/tabs/about";
import Status from "../components/tabs/status";
import Moves from "../components/tabs/moves";

import Nav from "../components/nav";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState(null);
  const [displayIndex, setDisplayIndex] = useState("about");
  const [isActive, setIsActive] = useState("about");
  console.log(props.currentPokemon);

  async function getData(id) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    return data.json();
  }

  useEffect(() => {
    getData(props.currentPokemon).then((data) => {
      setPokemon((prev) => data);
    });
  }, []);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <>
      {pokemon && (
        <div className="page" id="pokemon">
          <Nav
            additionalClasses={"dark-text"}
            data={{
              content:
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
              value: "pokemon",
              id: pokemon.id,
            }}
          />
          <div className={`pokemon-inner ${pokemon.types[0].type.name}`}>
            <div className="upper">
              <div
                className="img-container"
                style={{
                  backgroundImage: `url(${pokemon.sprites.front_default})`,
                }}
              >
                <div className={`pokemon-type ${pokemon.types[0].type.name}`}>
                  {pokemon.types[0].type.name}
                </div>
              </div>
            </div>
            <div className="lower">
              <div className="navigate-buttons">
                <button className="left">
                  <IoIosArrowBack />
                </button>
                <button className="right">
                  <IoIosArrowForward />
                </button>
              </div>
              <div className="tab-content">
                <div className="container">
                  <ul className="tabs">
                    <li
                      id="tab-1"
                      className={isActive === "about" ? `tab-active ${pokemon.types[0].type.name}` : `tab ${pokemon.types[0].type.name}-light`}
                      onClick={() => {
                        setDisplayIndex("about");
                        setIsActive("about");
                      }}
                    >
                        <p>About</p>
                    </li>
                    <li
                      id="tab-2"
                      className={isActive === "status" ? `tab-active ${pokemon.types[0].type.name}` : `tab ${pokemon.types[0].type.name}-light`}
                      onClick={() => {
                        setDisplayIndex("status");
                        setIsActive("status");
                      }}
                    >
                        <p>Status</p>
                    </li>
                    <li
                      id="tab-3"
                      className={isActive === "moves" ? `tab-active ${pokemon.types[0].type.name}` : `tab ${pokemon.types[0].type.name}-light`}
                      onClick={() => {
                        setDisplayIndex("moves");
                        setIsActive("moves");
                      }}
                    >
                        <p>Moves</p>
                    </li>
                  </ul>
                  <div className="display-container" id="display-container">
                    {displayIndex === "about" && <About />}
                    {displayIndex === "status" && <Status/>}
                    {displayIndex === "moves" && <Moves />}
                  </div>
                </div>
              </div>
              <PokemonFooter />
            </div>
          </div>
        </div>
      )}
      {!pokemon && <h1>Loading</h1>}
    </>
  );
};

export default Pokemon;
