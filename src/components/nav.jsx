import React from 'react';
import { TbPokeball } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";


const Nav = (props) => {
    function determineIcon() {
        switch (props.data.value) {
            case "home" : return <TbPokeball />
            default : return <IoIosArrowBack />
        }
    }
    return (
        <div className="nav">
            <span className={`nav-items ${props.additionalClasses}`}>{determineIcon()}<span> {props.data.content}</span></span>
        </div>
    );
}

export default Nav;
