import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const User = () => {
  const userData = useContext(UserContext);
  const user = userData.user;
  const pagesUser = window.location.href.split("/").slice(-1)[0];
  console.log(userData.user);
  const [pageOwner, setPageOwner] = useState(false);
  const navigate = useNavigate();

  console.log(user);

  const testBadges = [
    {
      name: "Boulder Badge",
    },
    {
      name: "Cascade Badge",
    },
    {
      name: "Thunder Badge",
    },
    {
      name: "Rainbow Badge",
    },
    // {
    //   "name": "Marsh Badge",
    // },
    // {
    //   "name": "Soul Badge",
    // },
    // {
    //   "name": "Volcano Badge",
    // },
    // {
    //   "name": "Earth Badge",
    // }
  ];

  const testFavs = [150];

  function logOut() {
    localStorage.setItem("user", JSON.stringify({}));
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    if (user) {
      if (pagesUser == userData.user._id) {
        setPageOwner(true);
      }
    }
  }, []);

  return pageOwner ? (
    <div className="user-page page">
      <div className="user-content">
        <div className="user-info">
          <p>
            <strong>Username: </strong>
            {user.username}
          </p>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>xP: </strong>
            {user.experience}
          </p>
        </div>
        {user.badges.length ? (
          <div className="badges">
            <div className="title">Badges</div>
            {user.badges.map((badge) => {
              const imgPath = `../imgs/badges/${badge
                .split(" ")[0]
                .toLowerCase()}.png`;
              console.log(imgPath);
              return <img src={imgPath} alt="badge" />;
            })}
          </div>
        ) : (
          <></>
        )}
        {user.favorites.length ? (
          <div className="favorites">
            <div className="title">Favorites</div>
            {user.favorites.map((pokemon) => {
              const imgPath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon}.svg`;
              return <img src={imgPath} alt="pokemon" />;
            })}
          </div>
        ) : (
          <></>
        )}

        <button onClick={() => navigate("/quizes")}>Gain More xP</button>
        <button onClick={() => navigate("/pokedex")}>Pokedex</button>
        <button onClick={() => logOut()}>Signout</button>
      </div>
    </div>
  ) : (
    <div className="user-page">
      <div className="user-content">
        <p>This is not your page. You can only view this users public info</p>
      </div>
    </div>
  );
};

export default User;
