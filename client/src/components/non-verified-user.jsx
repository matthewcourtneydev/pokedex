import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendButton from "./friendButton";

const NonVerifiedUser = (props) => {
  const pageInfo = props.pageOwner;
  const navigate = useNavigate();
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageData.user);


  return Object.keys(pageInfo).length && user ? (
    <div className="user-page page">
      <div className="user-content content">
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

        {pageInfo.friends && pageInfo.friends.length ? (
          <div className="friends">
            <div className="title">Friends</div>
            {pageInfo.friends.map((friend) => {
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
        <FriendButton pageInfo={pageInfo} />
      </div>
    </div>
  ) : (
    <div className="user-page page">
      <div className="user-content content">
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
        {Object.keys(pageInfo).length && pageInfo.badges.length ? (
          <div className="badges">
            <div className="title">Badges</div>
            {pageInfo.badges.map((badge) => {
              const imgPath = `../imgs/badges/${badge
                .split(" ")[0]
                .toLowerCase()}.png`;
              return <img src={imgPath} alt="badge" />;
            })}
          </div>
        ) : (
          <span className="manual-10px-gap"></span>
        )}
        {Object.keys(pageInfo).length && pageInfo.favorites.length ? (
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

        {pageInfo.friends && pageInfo.friends.length ? (
          <div className="friends">
            <div className="title">Friends</div>
            {pageInfo.friends.map((friend) => {
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
      </div>
    </div>
  );
};

export default NonVerifiedUser;
