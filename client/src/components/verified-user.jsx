import React from "react";
import { useNavigate } from "react-router-dom";

const VerifiedUser = (props) => {
  const userData = props.user;
  const navigate = useNavigate();

  function logOut() {
    localStorage.setItem("user", JSON.stringify({}));
    window.location.reload();
    navigate("/");
  }

  return Object.keys(userData).length ? (
    <div className="user-page page">
      <div className="user-content content">
        <div className="user-info">
          <div className={`_${userData.starter} starter`}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                userData.starter
              )}.png`}
              alt=""
            />
          </div>
          <p>
            <strong>Username: </strong>
            {userData.username}
          </p>
          <p>
            <strong>Email: </strong>
            {userData.email}
          </p>
          <p>
            <strong>xP: </strong>
            {userData.experience}
          </p>
        </div>
        {userData.badges.length ? (
          <div className="badges">
            <div className="title">Badges</div>
            {userData.badges.map((badge) => {
              const imgPath = `../imgs/badges/${badge
                .split(" ")[0]
                .toLowerCase()}.png`;
              return <img src={imgPath} alt="badge" />;
            })}
          </div>
        ) : (
          <></>
        )}
        {userData.favorites.length ? (
          <div className="favorites">
            <div className="title">Favorites</div>
            {userData.favorites.map((pokemon) => {
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

        {userData.friends.length ? (
          <div className="friends">
            <div className="title">Friends</div>
            {userData.friends.map((friend) => {
              const imgPath2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                friend.starter
              )}.png`;
              return (
                <a href={`/user/${friend._id}`}>
                <div className="friend">
                  <img
                    src={imgPath2}
                    className={`_${friend.starter}`}
                    alt="pokemon"
                  />
                  ;<p>{friend.username}</p>
                </div>
                </a>
              );
            })}
          </div>
        ) : (
          <span className="manual-10px-gap"></span>
        )}

        <button onClick={() => navigate("/quizes")}>Gain More xP</button>
        <button onClick={() => navigate("/pokedex")}>Pokedex</button>
        <button onClick={() => logOut()}>Signout</button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default VerifiedUser;
