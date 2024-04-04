import React from 'react';
import { IoSearch } from "react-icons/io5";


const Searchbar = (props) => {
    console.log(props.input)

    function handleInput(e) {
        props.setInput((prev) => {
            return e.target.value;
        });

        props.setSearchInput((prev) => {
            return e.target.value
        })
    }
    return (
        <div className="searchbar">
            <span className="icon"><IoSearch /></span>
            <input type="text" className="search" placeholder="Search" value={props.input} id="pokemon-search" onChange={(e) => handleInput(e)} />
        </div>
    );
}

export default Searchbar;
