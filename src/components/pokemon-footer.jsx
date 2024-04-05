import { React, useEffect, useState } from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoShuffle } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import FooterEvolutionChain from "./footer-evolution-chain";

const PokemonFooter = (props) => {
  const [isFavorite, setIsFavorite] = useState(
    props.favorites.favorites.some((obj) => obj.id === props.id)
  );
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [isEvoOpen, setIsEvoOpen] = useState(false)
  const [evoChain, setEvoChain] = useState([]);


  function faceBtn() {
    setIsEvoOpen((prev) => true)
    setFooterExpanded((prev) => !prev);
    
  }

  function shuffleBtn() {
    props.setCurrentPokemon((prev) => {
      return Math.round(Math.random() * (1025 - 0) + 0);
    });
  }

  function locationBtn() {
    console.log("Location pressed");
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

        if (data.chain.evolves_to[0].evolves_to.length) {
          dataArray.push(data.chain.evolves_to[0].evolves_to[0].species)
        }
        
        setEvoChain((prev) => {
          return dataArray
        })
      })
    })
  }, [props.speciesUrl]);


  return (
    <div className={footerExpanded ? "footer" : "footer small"}>
      <div className="button-container">
        <button className="footer-btn" onClick={() => faceBtn()}>
          <CiFaceSmile />
        </button>
        <button
          className={`footer-btn ${isFavorite ? "red" : ""}`}
          onClick={() => favoriteBtn()}
        >
          <FaHeart />
        </button>
        <button className="footer-btn" onClick={() => shuffleBtn()}>
          <IoShuffle />
        </button>
        <button className="footer-btn" onClick={() => locationBtn()}>
          <FaLocationDot />
        </button>
      </div>
      <div className={`small-inner ${props.type}`}>
        <div className="back-nav">
          <div
            className="back-button"
            onClick={() => setFooterExpanded((prev) => !prev)}
          >
            <IoIosArrowBack />
            <span>{`${
              props.name.charAt(0).toUpperCase() + props.name.slice(1)
            } #${props.id}`}</span>
          </div>
        </div>
        <div className="lower" style={{ height: "90vh" }}>
            {isEvoOpen ? <FooterEvolutionChain evoChain={evoChain} id={props.id} footerExpanded={footerExpanded} /> : <></>} 
        </div>
      </div>
    </div>
  );
};

export default PokemonFooter;
