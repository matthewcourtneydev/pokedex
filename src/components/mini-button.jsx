import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MiniButton = (props) => {
    const navigate = useNavigate()
    const [i, setI] = useState(props.i)
    
    async function fetchPokemonArray(url) {
        const list = await fetch(url);

        return list.json()
    }

    async function setPokemonListState() {
        const list = await fetchPokemonArray(props.url);
        console.log(props)

        if (props.searchCriteria === "Types") {
            await props.finalizeSearch(list.pokemon);
            props.setExpectedDataLength((prev) => list.pokemon.length)
            nextPage()
        } else if (props.searchCriteria === "Locations") {
            const newPokedexData = await fetchPokemonArray(list.pokedexes[0].url)
            await props.finalizeSearch(newPokedexData.pokemon_entries);
            props.setExpectedDataLength((prev) => newPokedexData.pokemon_entries.length)
            nextPage()
        } else if (props.searchCriteria === "Moves and Abilities") {
            await props.finalizeSearch(list.learned_by_pokemon);
            props.setExpectedDataLength((prev) => list.learned_by_pokemon.length)
            nextPage()
        }
        
    }

    function nextPage() {
        navigate("/pokedex")
    }

    return (
        <div className={`mini-button ${props.name}`} onClick={setPokemonListState}>
            <h3>{props.name.replace('-', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())}</h3>
        </div>
    );
}

export default MiniButton;
