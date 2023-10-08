import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UilTrophy, UilUserCircle, UilSignInAlt } from "@iconscout/react-unicons";
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
        <a className="right-icon"  href={`/user/${userData.user._id}`}>
          <UilUserCircle />
        </a>
    </nav>
  ) : (
    <nav id="nav-bar">
      <span>
        <a href="/">
          <UilTrophy />
        </a>
      </span>
      <a className="right-icon" href="/login">
        <UilSignInAlt />
      </a>
    </nav>
  );
};

export default Nav;
