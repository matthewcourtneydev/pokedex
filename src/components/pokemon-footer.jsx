import { React, useEffect, useState } from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { PiShuffleAngularBold } from "react-icons/pi";
import { HiMiniSparkles } from "react-icons/hi2";

import FooterEvolutionChain from "./footer-content/footer-evolution-chain";
import FooterLocation from "./footer-content/footer-location";
import face from "../imgs/face.png"

const PokemonFooter = (props) => {
  const [isFavorite, setIsFavorite] = useState(
    props.favorites.favorites.some((obj) => obj.id === props.id)
  );
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [isEvoOpen, setIsEvoOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [evoChain, setEvoChain] = useState([]);


  function faceBtn() {
    setIsEvoOpen((prev) => true)
    setFooterExpanded((prev) => !prev);
    
  }

  function shuffleBtn() {
    props.setIsShiny((prev) => !prev)
  }

  function locationBtn() {
    setIsLocationOpen((prev) => {
      return !prev
    });
    setFooterExpanded((prev) => !prev);
  }

  function favoriteBtn() {
    if (isFavorite) {
      localStorage.setItem(
        "mdc_pokdex_favorite_list",
        JSON.stringify({
          favorites: [
            ...props.favorites.favorites.filter((item) => item.id !== props.id),
          ],
        })
      );
      setIsFavorite((prev) => !prev);
      props.setFavorites((prev) => {
        return {
          favorites: [
            ...props.favorites.favorites.filter((item) => item.id !== props.id),
          ],
        };
      });
    } else {
      localStorage.setItem(
        "mdc_pokdex_favorite_list",
        JSON.stringify({
          favorites: [
            ...props.favorites.favorites,
            {
              id: props.id,
              url: `https://pokeapi.co/api/v2/pokemon/${props.id}/`,
            },
          ],
        })
      );
      setIsFavorite((prev) => !prev);
      props.setFavorites((prev) => {
        return {
          favorites: [
            ...props.favorites.favorites,
            {
              id: props.id,
              name: props.name,
              url: `https://pokeapi.co/api/v2/pokemon/${props.id}/`,
            },
          ],
        };
      });
    }
  }

  async function getSpeciesData(url) {
    const data = await fetch(url);
    return data.json();
  }

  async function getEvoData(url) {
    const data = await fetch(url);
    return data.json();
  }

  useEffect(() => {
    setFooterExpanded((prev) => {
      return false;
    })
    setIsFavorite(props.favorites.favorites.some((obj) => obj.id === props.id));
  }, [props.id]);



  useEffect(() => {
    setEvoChain((prev) => {
      return []
    });

    getSpeciesData(props.speciesUrl).then((data) => {
      getEvoData(data.evolution_chain.url).then((data) => {
        const dataArray = [];
        dataArray.push(data.chain.species);

        if (data.chain.evolves_to.length) {
          dataArray.push(data.chain.evolves_to[0].species)
        } 

        if (data.chain.evolves_to.length && data.chain.evolves_to[0].evolves_to.length) {
          dataArray.push(data.chain.evolves_to[0].evolves_to[0].species)
        }
        
        setEvoChain((prev) => {
          return dataArray
        })
      })
    })
  }, [props.speciesUrl]);

  console.log(props.pokemon)

  return (
    <div className={isEvoOpen || isLocationOpen ? "footer" : "footer small"}>
      <div className="button-container">
        <button className="footer-btn" onClick={() => faceBtn()}>
         <img src={face} alt="" />
        </button>
        <button
          className={`footer-btn ${isFavorite ? "red" : ""}`}
          onClick={() => favoriteBtn()}
        >
          <FaHeart />
        </button>
        <button className={`footer-btn ${props.isShiny ? "yellow" : ""}`} onClick={() => shuffleBtn()}>
        <strong><HiMiniSparkles /></strong>
        </button>
        <button className="footer-btn" onClick={() => locationBtn()}>
          <FaLocationDot />
        </button>
      </div>
    {isLocationOpen ? <FooterLocation name={props.name} type={props.type} isLocationOpen={isLocationOpen} setIsLocationOpen={setIsLocationOpen} id={props.id} /> : <div></div>}
    {isEvoOpen ? <FooterEvolutionChain type={props.type} isEvoOpen={isEvoOpen} setIsEvoOpen={setIsEvoOpen} name={props.name} evoChain={evoChain} id={props.id} footerExpanded={footerExpanded} /> : <div className="hide"></div>}
    </div>
  );
};

export default PokemonFooter;
