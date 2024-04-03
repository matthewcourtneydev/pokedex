import React from "react";
import { useNavigate } from "react-router-dom";
import { TbPokeball } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Button = ({ buttonData, setSearchCriteria, selectSearch, favorites, finalizeSearch, setExpectedDataLength }) => {
  const navigate = useNavigate();

  function handleSubmit(category) {
    if (category === 'Favorites') {
      console.log("Favorites");
      selectSearch(category);
      setSearchCriteria((prev) => "Favorites")
      finalizeSearch(favorites.favorites);
      setExpectedDataLength((prev) => {
        return favorites.favorites.length
      })
      navigate("/pokedex");
      return;
    } else {
      selectSearch(category);
      navigate("/search");
    }
  }

  function determineIcon() {
    switch (buttonData.icon) {
      case "pokeball":
        return <TbPokeball />;
      case "pin":
        return <FaLocationDot />;
      case "star":
        return <FaStar />;
      case "heart":
        return <FaHeart />;
    }
  }
  return (
    <div
      className={`button ${buttonData.class}`}
      onClick={() => handleSubmit(buttonData.content)}
    >
      <h2>{buttonData.content}</h2>
      <span className="button-icon">{determineIcon()}</span>
    </div>
  );
};

export default Button;
