import { React, useState } from 'react';

const PokedexCard = (props) => {
    const [currentPokemon, setCurrentPokemon] = useState(props.pokemon)

    console.log(currentPokemon)
    return (
        <div className="pokedex-card">
            <div className="id"><span>#{currentPokemon.id}</span></div>
            <div className="image">
                <img src={currentPokemon.sprites.front_default} alt="" />
            </div>
            <div className="name">{currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}</div>
        </div>
    );
}

export default PokedexCard;
