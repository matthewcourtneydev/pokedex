import React from 'react';
import { IoSearch } from "react-icons/io5";


const Searchbar = (props) => {
    return (
        <div className="searchbar">
            <span className="icon"><IoSearch /></span>
            <input type="text" className="search" placeholder="Search" id="pokemon-search" onChange={(e) => props.updateInput(e.target.value)} />
        </div>
    );
}

export default Searchbar;
