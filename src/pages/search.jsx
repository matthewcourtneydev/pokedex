import { React, useEffect, useState } from "react";
import Nav from "../components/nav";
import MiniButton from "../components/mini-button";
import Searchbar from "../components/searchbar";
import { TbSettingsDollar } from "react-icons/tb";

const Search = (props) => {
  const [searchData, setSearchData] = useState(props.searchCriteria);
  const [isLoading, setIsLoading] = useState(true);
  const [currentResult, setCurrentResult] = useState({});
  const [currentData, setCurrentData] = useState("");

  async function getPokemon(url) {
    const response = await fetch(url);
    return response.json();
  }

  async function settingState(newState) {
    setCurrentResult((prev) => {
        return newState;
    });
    return true;
  }

  useEffect(async () => {
    let url;
    switch (searchData) {
      case "Types":
        url = "https://pokeapi.co/api/v2/type/";
    }
    const dataIn = await getPokemon(url)
    await settingState(dataIn.results);
  }, []);

  useEffect(() => {
    if (Object.keys(currentResult).length) {
        // debugger;
        console.log(currentResult);
        setIsLoading(false)
    }
  }, [currentResult]);

  return (
    <>
    {isLoading && <div>LOADING</div>}
    {!isLoading && <div className="page" id="search">
      <Nav
        additionalClasses={"dark"}
        data={{ value: "", content: `${props.searchCriteria}` }}
      />
      <div className="search-inner">
        <Searchbar />
        <div className="mini-button-container">
          {currentResult.map((type) => (
            <MiniButton name={type.name} url={type.url}/>
          ))}
        </div>
      </div>
    </div>}
    </>
  );
};

export default Search;