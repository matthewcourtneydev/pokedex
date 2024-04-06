import React from 'react';
import { IoSearch } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";



const Searchbar = (props) => {
    function handleInput(e) {
        props.setInput((prev) => {
            return e.target.value;
        });

        if (props.setSearchInput) {
            props.setSearchInput((prev) => {
                return e.target.value
            })
        }
    }
    return (
        <div className="searchbar">
            <span className="icon"><IoSearch /></span>
            <input type="text" className="search" placeholder="Search" value={props.input} id="pokemon-search" onChange={(e) => handleInput(e)} />
            {props.isHome && <button className='enter' onClick={() => props.handleEnter()}><FaArrowRight /></button>}
        </div>
    );
}

export default Searchbar;
