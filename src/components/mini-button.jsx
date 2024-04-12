import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fire from "../imgs/fire.webp"

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
            await props.finalizeSearch(list.pokemon, "types");
            props.setExpectedDataLength((prev) => list.pokemon.length)
            props.setSecondaryCriteria((prev) => props.name.charAt(0).toUpperCase() + props.name.slice(1))
            nextPage()
        } else if (props.searchCriteria === "Locations") {
            const newPokedexData = await fetchPokemonArray(list.pokedexes[0].url)
            await props.finalizeSearch(newPokedexData.pokemon_entries, "locations");
            props.setExpectedDataLength((prev) => newPokedexData.pokemon_entries.length)
            props.setSecondaryCriteria((prev) => props.name.charAt(0).toUpperCase() + props.name.slice(1))
            nextPage()
        } else if (props.searchCriteria === "Moves") {
            await props.finalizeSearch(list.learned_by_pokemon, "moves");
            props.setExpectedDataLength((prev) => list.learned_by_pokemon.length)
            props.setSecondaryCriteria((prev) => props.name.charAt(0).toUpperCase() + props.name.slice(1))
            nextPage()
        }

        props.setPrevPage((prev) => "/search")
        
    }

    function nextPage() {
        navigate("/pokedex")
    }

    return (
        <div className={`mini-button ${props.name}`} onClick={setPokemonListState}>
            <h3>{props.name.replace('-', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())}</h3>
            {props.searchCriteria === "Types" ? <img src={require(`../imgs/${props.name}.png`)} alt="" /> : <></>}
        </div>
    );
}

export default MiniButton;
