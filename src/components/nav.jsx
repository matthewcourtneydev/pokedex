import React from 'react';
import { TbPokeball } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Nav = (props) => {
    const navigate = useNavigate()

    function handleBack() {
        if(props.prevPage =="/search") {
            props.setSecondaryCriteria((prev) => null);
            navigate(props.prevPage)
        } else {
            navigate(props.prevPage)
        }
    }

    function determineIcon() {
        console.log(props.data.value)
        switch (props.data.value) {
            case "home" : return <TbPokeball />
            default : return <IoIosArrowBack onClick={() => handleBack()}/>
        }
    }
    return (
        <div className="nav">
            <strong><span className={`nav-items ${props.additionalClasses}`}>{determineIcon()}<span>{props.data.content}</span>{props.data.id ? <span className="pokemon-id">#{props.data.id}</span> : <></>} </span></strong>
        </div>
    );
}

export default Nav;
