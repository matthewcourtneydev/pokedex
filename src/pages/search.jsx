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
  let url;

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

  function determineUrl(searchData) {
    switch (searchData) {
      case "Types":
        return (url = "https://pokeapi.co/api/v2/type/");
      case "Locations":
        return (url = "https://pokeapi.co/api/v2/region/");
    }
  }

  async function retrieveData() {
    determineUrl(searchData);
    const dataIn = await getPokemon(url);
    await settingState(dataIn.results);
  }

  useEffect(() => {
    retrieveData();
    console.log(props.searchCriteria, "SEARCH");
  }, []);

  useEffect(() => {
    if (Object.keys(currentResult).length) {
      setIsLoading(false);
      console.log(currentResult);
    }
  }, [currentResult]);

  return (
    <>
      {isLoading && <div>LOADING</div>}
      {!isLoading && (
        <div className="page" id="search">
          <Nav
            additionalClasses={"dark-text"}
            data={{ value: "", content: `${props.searchCriteria}` }}
          />
          <div className="search-inner">
            <Searchbar />
            <div className="mini-button-container">
              {currentResult.map((type) => (
                <MiniButton
                  setExpectedDataLength={props.setExpectedDataLength}
                  finalizeSearch={props.finalizeSearch}
                  name={type.name}
                  url={type.url}
                  searchCriteria={props.searchCriteria}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
