import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";

const User = () => {
  const userData = useContext(UserContext);
  const user = userData.user;
  const pagesUser = window.location.href.split("/").slice(-1)[0];
  console.log(userData.user);
  const [pageOwner, setPageOwner] = useState(false);

  console.log(user);

  const testBadges = [
    {
      "name": "Boulder Badge",
    }
  ]

  useEffect(() => {
    if (user) {
      if (pagesUser == userData.user._id) {
        setPageOwner(true);
      }
    }
  }, []);

  return pageOwner ? (
    <div className="user-page">
      <div className="user-content">
        <div className="user-info">
          <p><strong>Username: </strong>{user.username}</p>
          <p><strong>Email: </strong>{user.email}</p>
        </div>
        <div className="badges">
          <div className="badge">
            {testBadges.map(badge => {
              const imgPath = `./imgs/badges/${badge.name.split(" ")[0].toLowerCase()}.png`;
              console.log(imgPath)
              return <img src={imgPath} alt="badge" />
            })}
          </div>
        </div>
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
