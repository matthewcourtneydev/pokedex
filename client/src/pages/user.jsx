import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import VerifiedUser from "../components/verified-user";
import NonVerifiedUser from "../components/non-verified-user";

const User = () => {
  const userData = useContext(UserContext);
  const user = userData.user;
  const pageId = window.location.href.split("/").slice(-1)[0];
  const [pageOwner, setPageOwner] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();


  async function getPageInfo() {
    const response = await fetch(
      `/users/${
        window.location.href.split("/").slice(-1)[0]
      }`
    );
    return response.json();
  }


  useEffect( () => {
    if (user && (pageId == userData.user._id)) {
        setPageOwner(true);
    } else {
      getPageInfo().then((data) => {
        setPageInfo(data);
      });
    }
  }, []);


  return pageOwner ? (
    <VerifiedUser user={user}/>
  ) : (
    <NonVerifiedUser pageOwner={pageInfo} user={user}/>
  )
};

export default User;
