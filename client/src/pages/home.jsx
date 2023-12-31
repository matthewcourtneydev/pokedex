import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import img from "../imgs/pokedex.png";

const Home = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function rediretToUserProfile() {
    navigate(`/user/${user.user._id}`);
  }

  function rediretToUserPokedex() {
    navigate("pokedex");
  }

  function rediretToRegister() {
    navigate("/register");
  }
  return (
    <div className="homepage page">
      <div className="homepage-content content">
        <img src={img} alt="" />
        <img
          className="group-img"
          src="https://i.pinimg.com/originals/35/ba/a2/35baa23613f80db94564d2fe5c1ecce6.png"
          alt=""
        />
        {user.user && user.user.email ? (
          <>
            <button className="homepage-btn margin-top-30px" onClick={rediretToUserProfile}>
              My Profile
            </button>
            <button className="homepage-btn" onClick={rediretToUserPokedex}>
              Pokedex
            </button>
          </>
        ) : (
          <>
            <p>Start your journey today</p>
            <button className="homepage-btn" onClick={rediretToRegister}>
              Sign Up Now
            </button>
            <button className="homepage-btn" onClick={rediretToUserPokedex}>
              Pokedex
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
