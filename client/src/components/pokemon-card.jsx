import React from 'react';

const PokemonCard = (props) => {
    console.log(props)
    return (
        <div className="poke-card">
            <strong><p>Name: {props.pokemon.name}</p></strong>
        </div>
    );
}

export default PokemonCard;
