import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { UserContext } from '../contexts/userContext';

const Favorite = () => {
    const userData = useContext(UserContext);
    const { id } = useParams();
    let favorites = userData.user.favorites;
    const [isFav, setIsFav] = useState((favorites.includes(id)) || (favorites.includes(JSON.stringify(id))));
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    console.log(isFav);

    async function addToFavorites() {
        setIsFav(prevIsFav => !prevIsFav);
        console.log(userData.user._id, isFav);
        patchFavs([...favorites, id]).then((data) => console.log(data));
        localStorageData.user.favorites = [...favorites, id];
        localStorage.setItem("user", JSON.stringify(localStorageData))
    }

    async function removeFromFavorites() {
        setIsFav(prevIsFav => !prevIsFav);
        const index = favorites.indexOf(id);
        favorites = favorites.splice(index, 1)
        patchFavs([...favorites]).then((data) => console.log(data));
    }

    async function patchFavs(favorites) {
        const response = await fetch(`http://localhost:3002/users/${userData.user._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "favorites": favorites
            })
        })

        const resFavs = response.json();
        return resFavs;
    }

    return (
        isFav ? (<button id="fav-btn" onClick={removeFromFavorites} >Remove</button>) : (<button id="fav-btn" onClick={addToFavorites} >Favorite</button>)
    );
}

export default Favorite;
