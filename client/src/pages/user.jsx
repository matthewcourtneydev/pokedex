import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const User = () => {
  const userData = useContext(UserContext);
  const user = userData.user;
  const pageId = window.location.href.split("/").slice(-1)[0];
  const [pageOwner, setPageOwner] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();

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

  async function getPageInfo() {
    console.log(window.location.href.split("/").slice(-1)[0]);
    const response = await fetch(
      `http://localhost:3002/users/${
        window.location.href.split("/").slice(-1)[0]
      }`
    );
    return response.json();
  }

  function update() {}

  useEffect(() => {
    if (user) {
      if (pageId == userData.user._id) {
        setPageOwner(true);
      }
    } else {
      getPageInfo().then((data) => {
        setPageInfo(data);
      });
    }
  }, []);

  return pageOwner ? (
    <div className="user-page page">
      <div className="user-content">
        <div className="user-info">
          <div className="starter">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                userData.user.starter
              )}.png`}
              alt=""
            />
          </div>
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
              const imgPath2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`;
              return <img src={imgPath2} alt="pokemon" />;
            })}
          </div>
        ) : (
          <>
            <span className="manual-10px-gap"></span>
          </>
        )}

        <button onClick={() => navigate("/quizes")}>Gain More xP</button>
        <button onClick={() => navigate("/pokedex")}>Pokedex</button>
        <button onClick={() => logOut()}>Signout</button>
      </div>
    </div>
  ) : (
    <div className="user-page page">
      <div className="user-content">
        <div className="user-info">
          <div className="starter">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                pageInfo.starter
              )}.png`}
              alt=""
            />
          </div>
          <p>
            <strong>Username: </strong>
            {pageInfo.username}
          </p>
          <p>
            <strong>xP: </strong>
            {pageInfo.experience}
          </p>
        </div>
        {pageInfo.badges.length ? (
          <div className="badges">
            <div className="title">Badges</div>
            {pageInfo.badges.map((badge) => {
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
        {pageInfo.favorites.length ? (
          <div className="favorites">
            <div className="title">Favorites</div>
            {pageInfo.favorites.map((pokemon) => {
              const imgPath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon}.svg`;
              const imgPath2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`;
              return <img src={imgPath2} alt="pokemon" />;
            })}
          </div>
        ) : (
          <>
            <span className="manual-10px-gap"></span>
          </>
        )}
        <button onClick={() => {console.log('Friend Added!')}}>Add as Friend</button>
      </div>
    </div>
  );
};

export default User;
