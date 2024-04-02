import { React, useEffect, useState} from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoShuffle } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";


const PokemonFooter = (props) => {
  console.log(props.favorites)
  const [isFavorite, setIsFavorite] = useState(props.favorites.favorites.some(obj => obj.id === props.id))

    function faceBtn() {
        console.log("Face Pressed");
    }

    function shuffleBtn() {
        console.log("Shuffle Pressed")
    }

    function locationBtn() {
        console.log("Location pressed")
    }

    function favoriteBtn() {
      if (isFavorite) {
        localStorage.setItem("mdc_pokdex_favorite_list", JSON.stringify({"favorites" : [...props.favorites.favorites.filter((item) => item.id !== props.id)]}))
        setIsFavorite((prev) => !prev);
        props.setFavorites((prev) => {
          return {"favorites" : [...props.favorites.favorites.filter((item) => item.id !== props.id)]};
        })
      } else {
        localStorage.setItem("mdc_pokdex_favorite_list", JSON.stringify({"favorites" : [...props.favorites.favorites, {"id" : props.id, "url": `https://pokeapi.co/api/v2/pokemon/${props.id}/`}]}));
        setIsFavorite((prev) => !prev);
        props.setFavorites((prev) => {
          return {"favorites" : [...props.favorites.favorites, {"id" : props.id, "url": `https://pokeapi.co/api/v2/pokemon/${props.id}/`}]}
        })
      }
      
    }

    useEffect(() => {
      console.log(isFavorite)
    }, [isFavorite])
  return (
    <div className="footer">
      <button className="footer-btn" onClick={() => faceBtn()}><CiFaceSmile /></button>
      <button className={`footer-btn ${isFavorite ? "red" : ""}`} onClick={() => favoriteBtn()}><FaHeart /></button>
      <button className="footer-btn" onClick={() => shuffleBtn()}><IoShuffle /></button>
      <button className="footer-btn" onClick={() => locationBtn()}><FaLocationDot /></button>
    </div>
  );
};

export default PokemonFooter;
