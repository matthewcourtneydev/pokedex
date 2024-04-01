import React from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoShuffle } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";


const PokemonFooter = () => {
    function faceBtn() {
        console.log("Face Pressed");
    }

    function favoriteBtn() {
        console.log("Added to favorites")
    }

    function shuffleBtn() {
        console.log("Shuffle Pressed")
    }

    function locationBtn() {
        console.log("Location pressed")
    }
  return (
    <div className="footer">
      <button className="footer-btn" onClick={() => faceBtn()}><CiFaceSmile /></button>
      <button className="footer-btn" onClick={() => favoriteBtn()}><FaHeart /></button>
      <button className="footer-btn" onClick={() => shuffleBtn()}><IoShuffle /></button>
      <button className="footer-btn" onClick={() => locationBtn()}><FaLocationDot /></button>
    </div>
  );
};

export default PokemonFooter;
