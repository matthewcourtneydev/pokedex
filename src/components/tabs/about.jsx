import React, { useEffect, useState } from 'react';

const About = (props) => {
    const [pokemonAboutData, setPokemonAboutData] = useState(null)

    async function getDesc() {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}/`);
        return data.json()
    };

    function convertHeight(height, conversion) {
        if (conversion === "metric") {
            return `${height * 0.1} m`
        } else {
            let feetTotal = (height * 0.1 * 3.28084);
            let feet = feetTotal.toString().split(".")[0];
            let inches =  String(Math.round((feetTotal - parseInt(feet)) * 12)).padStart(2, '0');
            
            return `${feet}'${inches}"`
            
        }
    }

    useEffect(() => {
        getDesc().then((res) => setPokemonAboutData((prev) => {
            return res
        }));;
        console.log(pokemonAboutData)
    }, [])
    return (
        <>
        {pokemonAboutData && <div className="wrapper about-pokemon">
            <p className='pokemon-about-me-desc dark-text'>
                {`"${pokemonAboutData.flavor_text_entries[0].flavor_text}"`}
            </p>
            <div className="height-weight">
                <div className="height">
                    <h3>Height</h3>
                    <p className='dark-text'>{convertHeight(props.height, "emperial")}</p>
                    <p className='dark-text'>{convertHeight(props.height, "metric")}</p>
                </div>
                <div className="weight">
                <h3>Weight</h3>
                <p className='dark-text'>{props.weight}</p>
                <p className='dark-text'>{props.weight}</p>
                </div>
                <div className="strong">
                <h3>Strong against</h3>
                </div>
            </div>
            </div>}

        {!pokemonAboutData && <h1>Loading</h1>}
        </>
    );
}

export default About;
