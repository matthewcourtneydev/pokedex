import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PokedexCard = (props) => {

    return (
        <div className="pokedex-card" onClick={() => props.selectPokemon(props.pokemon.id)}>
            <div className="id"><span>#{props.pokemon.id}</span></div>
            <div className="image">
                <img src={props.pokemon.sprites.front_default} alt="" />
            </div>
            <div className="name">{props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</div>
        </div>
    );
}

export default PokedexCard;
