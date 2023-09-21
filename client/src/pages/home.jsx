import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import img from "../imgs/pokedex.png";

const Home = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user)

  function rediretToUserProfile() {
    navigate(`/user/${user.user._id}`)
  }

  function rediretToRegister() {
    navigate('/login')
  }
  return (
    <div className="homepage">
      <div className="homepage-content">
        <img src={img} alt="" />
        <img
          src="https://i.pinimg.com/originals/35/ba/a2/35baa23613f80db94564d2fe5c1ecce6.png"
          alt=""
        />
        <p>Start your journey today</p>
        {(user.user && user.user.email) ? (
          <button className="register" onClick={rediretToUserProfile} >My Profile</button>
        ) : (
          <button className="register" onClick={rediretToRegister} >Sign Up Now</button>
        )}
      </div>
    </div>
  );
};

export default Home;
