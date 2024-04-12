import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import { GiSpikyWing } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";


const About = (props) => {
    const [pokemonAboutData, setPokemonAboutData] = useState(null);
    const [typeData, setTypeData] = useState([]);
    const [typeDataLoaded, setTypeDataLoaded] = useState(false);

    async function getDesc() {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}/`);
        return data.json()
    };

    function determineIcon(type) {
        switch (type) {
            case "electric" : return <span className="strong-icon"></span>
            case "flying" : return <GiSpikyWing />
            case "water" : return <IoIosWater />
        }
    }

    function convertHeight(height, conversion) {
        if (conversion === "metric") {
            return `${(height * 0.1).toFixed(1)} m`
        } else {
            let feetTotal = (height * 0.1 * 3.28084);
            let feet = feetTotal.toString().split(".")[0];
            let inches =  String(Math.round((feetTotal - parseInt(feet)) * 12)).padStart(2, '0');

            return `${feet}'${inches}"`
            
        }
    }

    function convertWeight(weight, conversion) {
        if (conversion === "metric") {
            return `${(weight * 0.1).toFixed(1)} kg`
        } else {
            let pounds = (weight * 0.2204622622);
            return `${pounds.toFixed(1)} lbs`
        }
    }

    async function getTypeInfo(url) {
        const typeData = await fetch(url);
        return typeData.json()
    }


    useEffect(() => {
        getDesc().then((res) => setPokemonAboutData((prev) => {
            return res
        }));;
        props.types.forEach((type) => {
            getTypeInfo(type.type.url).then((data) => {
                const strengthArray = [];
                data.damage_relations.double_damage_to.forEach((type) => {
                    strengthArray.push(type.name)
                });
                setTypeData((prev) => {
                    return [...strengthArray]
                })
            })
        })

    }, [props.id]);

    useEffect(() => {
        if (typeData.length > 0) {
            setTypeDataLoaded((prev) => true)
        }
    }, [typeData])


    return (
        <>
        {pokemonAboutData && <div className="wrapper about-pokemon">
            <p className='pokemon-about-me-desc dark-text'>
                {`"${pokemonAboutData.flavor_text_entries[0].flavor_text}"`}
            </p>
            <div className="height-weight">
                <div className="height">
                    <h3>Height</h3>
                    <strong><p className='dark-text'>{convertHeight(props.height, "emperial")}</p></strong>
                    <strong><p className='dark-text'>{convertHeight(props.height, "metric")}</p></strong>
                </div>
                <div className="weight">
                <h3>Weight</h3>
                <strong><p className='dark-text'>{convertWeight(props.weight, "emperial")}</p></strong>
                <strong><p className='dark-text'>{convertWeight(props.weight, "metric")}</p></strong>
                </div>
                <div className="strong">
                <h3>Strong against</h3>
                {typeDataLoaded && <>
                    {[...new Set(typeData)].map((type) => {
                        return <div className={`strength-icon ${type}`}><span><img src={require(`../../imgs/${type}.png`)} alt="" /></span></div>
                    })}
                </>}
                </div>
            </div>
            </div>}
        {!pokemonAboutData && <h1>Loading</h1>}
        </>
    );
}

export default About;
