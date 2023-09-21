import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";

const User = () => {
  const userData = useContext(UserContext);
  const user = userData.user;
  const pagesUser = window.location.href.split("/").slice(-1)[0];
  console.log(userData.user);
  const [pageOwner, setPageOwner] = useState(false);

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
        <p>This is the users page you can access your personal profile info</p>
        {/* <div className="header">
                <div className="profile-pic"></div>
                <div className="info">
                <p>Username: {user.username}</p>
                <br/>
                <p>xP: {user.experience}</p>
                </div>
            </div> */}
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
