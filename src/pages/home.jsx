import React from 'react';
import Nav from '../components/nav';
import Searchbar from '../components/searchbar';
import buttonData from "../jcrs/home-buttons.json"
import Button from '../components/button';


const Home = (props) => {
    console.log(props)
    return (
        <div className="page" id="home">
                  <Nav data={{value: "home", content: "Pokedex"}}/>
            <div className="homepage-inner">
                <div className="upper">
                    <h1>Find your favorite pokemon</h1>
                    <Searchbar updateInput={props.updateInput} />
                </div>
                <div className="lower">
                    <div className="button-container">
                    {buttonData.map((btn, i) => {
                        return <Button selectSearch={props.selectSearch} index={i} buttonData={btn}/>
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
