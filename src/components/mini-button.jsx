import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MiniButton = (props) => {
    const navigate = useNavigate()
    const [i, setI] = useState(props.i)
    async function fetchPokemonArray() {
        const list = await fetch(props.url);
        return list.json()
    }

    async function setPokemonListState() {
        const list = await fetchPokemonArray();
        await props.finalizeSearch(list.pokemon);
        nextPage()
    }

    function nextPage() {
        debugger;
        navigate("/pokedex")
    }

    return (
        <div className={`mini-button ${props.name}`} onClick={setPokemonListState}>
            <h3>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h3>
        </div>
    );
}

export default MiniButton;
