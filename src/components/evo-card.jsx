import React, { useEffect, useState } from 'react';
import { FaLongArrowAltDown } from "react-icons/fa";


const EvoCard = (props) => {
    const [current, setCurrent] = useState(props.pokemon)
    useEffect(() => {
        setCurrent((prev) => {
            return props.pokemon
        })
    }, [])
    return (
        <div className="evo-pokemon">
            <img src={current.sprites.front_default} alt="" />
            <h2>{current.name.charAt(0).toUpperCase() + current.name.slice(1)}</h2>
            <div className={`type ${current.types[0].type.name}`}>{current.types[0].type.name}</div>
            {!props.isEnd ? <span><FaLongArrowAltDown /></span> : <></>}
        </div>
    );
}

export default EvoCard;
