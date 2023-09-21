import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UilTrophy, UilBars } from "@iconscout/react-unicons";
import { UserContext } from "../contexts/userContext";

const Nav = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.setItem("user", JSON.stringify({}));
    window.location.reload();
    navigate("/");
  }

  return userData.user && userData.user.email ? (
    <nav id="nav-bar">
      <span>
        <a href="/">
          <UilTrophy />
        </a>
      </span>
      <div className="nav-items"><UilBars/></div>
      {/* <ul className="nav-items">
        <li className="nav-item" onClick={logOut}>
          Logout
        </li>
        <li className="nav-item">
          <a href="/pokedex">Pokedex</a>
        </li>
      </ul> */}
    </nav>
  ) : (
    <nav id="nav-bar">
      <span>
        <a href="/">
          <UilTrophy />
        </a>
      </span>
      <div className="nav-items"><UilBars/></div>
      {/* <ul className="nav-items">
        <li className="nav-item">
          <a href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a href="/pokedex">Pokedex</a>
        </li>
      </ul> */}
    </nav>
  );
};

export default Nav;
