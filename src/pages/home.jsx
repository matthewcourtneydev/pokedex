import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import Searchbar from '../components/searchbar';
import buttonData from "../jcrs/home-buttons.json"
import Button from '../components/button';
import circle from "../imgs/circle.png"

const Home = (props) => {
    const [input, setInput] = useState(props.searchInput);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredArray, setFilteredArray] = useState([]);
    const navigate = useNavigate()

    async function getAllPokemon() {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025");
        return data.json()
    }

    function handleEnter() {
        console.log(filteredArray);
        props.setSecondaryCriteria(null);
        props.setSearchCriteria("Pokemon")
        props.finalizeSearch(filteredArray);
        navigate("/pokedex")
    }

    useEffect(() => {
        props.setIsFavFlow((prev) => false)
        props.setPrevPage((prev) => "/")
        getAllPokemon().then((data) => {
            props.finalizeSearch(data.results, "home");
        })
    }, []);

    useEffect(() => {
        console.log(props.setPokemonToGetGroup);
        setIsLoading((prev) => false)
    }, [props.setPokemonToGetGroup])

    useEffect(() => {
        if (input) {
            setFilteredArray((prev) => props.pokemonToGetGroup.filter((p) => p.name.includes(input)))
            console.log(filteredArray)
        }
    }, [input])
    
    return (
        <>
        {!isLoading && <div className="page" id="home">
                  <Nav additionalClasses={"white"} data={{value: "home", content: "Pokedex"}}/>
            <div className="homepage-inner">
                <div className="upper">
                    <img className="home-image" src={circle} alt="" />
                    <h1>Find your <br />favorite Pokemon</h1>
                    <Searchbar handleEnter={handleEnter} setInput={setInput} input={input} setSearchInput={props.setSearchInput} isHome={true} finalizeSearch={props.finalizeSearch} />
                </div>
                <div className="lower">
                    <div className="button-container">
                    {buttonData.map((btn, i) => {
                        return <Button setIsFavFlow={props.setIsFavFlow} setPrevPage={props.setPrevPage} setSearchInput={props.setSearchInput} finalizeSearch={props.finalizeSearch} setSearchCriteria={props.setSearchCriteria} setExpectedDataLength={props.setExpectedDataLength} favorites={props.favorites} selectSearch={props.selectSearch} index={i} buttonData={btn}/>
                    })}
                    </div>
                </div>
            </div>
        </div>}
        {isLoading && <h1 className='dark-text'>Loading</h1>}
        </>
    );
}

export default Home;
