import { React, useEffect, useState } from 'react';

const Pokedex = (props) => {
    // const [pokemonArray, setPokemonArray] = useState([]);
    // const [dataPresent, setDataPresent] = useState(false)

    // function pushItem(item) {
    //     setPokemonArray((prev) => [...prev, item])
    // }
    // async function getPokemonDataForListDisplay() {
    //     props.pokemonToGetGroup.forEach(async (pokemon) => {
    //         const pokemonData = await fetch(pokemon.url);
    //         pushItem(pokemonData)
    //     })
    // }

    // useEffect(() => {
    //     if (pokemonArray.length) {
    //         console.log(pokemonArray)
    //         setDataPresent(true)
    //     }
    // }, [pokemonArray])
    return (
        // <>
        // {dataPresent &&         <div className="page" id="pokedex">
        //     <h1>Pokedex</h1>
        // </div>}
        // {!dataPresent &&         <div className="page" id="pokedex">
        //     <h1>Loading</h1>
        // </div>}
        // </>
        <h1>Hello World</h1>
    );
}

export default Pokedex;
