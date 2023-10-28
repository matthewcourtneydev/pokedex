import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const FriendButton = (props) => {
  const userData = useContext(UserContext);
  const pageInfo = props.pageInfo;
  const { id } = useParams();
  let friends = userData.user.friends;
  const [isFriend, setIsFriend] = useState(
    friends.filter((friend) => friend._id == id).length > 0
  );
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  async function addToFriends() {
    setIsFriend((prevIsFriend) => !prevIsFriend);
    patchFriends([...friends, id]);
    localStorageData.user.friends = [...friends, pageInfo];
    localStorage.setItem("user", JSON.stringify(localStorageData));
  }

  async function removeFromFriends() {
    let friendIndex;
    setIsFriend(prevIsFriend => !prevIsFriend);
    friends.forEach((friend, i) => {
      if (friend._id == id) {
        friendIndex = i;
      }
    });

    if (friendIndex > -1) {
      friends = friends.splice(friendIndex, 1);
      localStorageData.user.friends = [...friends];
      localStorage.setItem("user", JSON.stringify(localStorageData));
      patchFriends([...friends]);
    }
  }

  async function patchFriends(friends) {
    const response = await fetch(
      `/users/${userData.user._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friends: friends,
        }),
      }
    );

    const resFriends = response.json();
    return resFriends;
  }

  return isFriend ? (
    <button id="fav-btn" onClick={removeFromFriends}>
      Remove Friend
    </button>
  ) : (
    <button id="fav-btn" onClick={addToFriends}>
      Add Friend
    </button>
  );
};

export default FriendButton;
