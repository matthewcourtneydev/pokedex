import { React, useEffect, useState } from "react";
import Nav from "../components/nav";
import MiniButton from "../components/mini-button";
import Searchbar from "../components/searchbar";
import { TbSettingsDollar } from "react-icons/tb";

const Search = (props) => {
  const [searchData, setSearchData] = useState(props.searchCriteria);
  const [isLoading, setIsLoading] = useState(true);
  const [currentResult, setCurrentResult] = useState({});
  const [wholeArray, setWholeArray] = useState([]);
  const [input, setInput] = useState(props.searchInput);
  const [filteredArray, setFilteredArray] = useState([]);
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
      case "Moves":
        return (url ="https://pokeapi.co/api/v2/move/")
    }
  }

  async function retrieveData() {
    determineUrl(searchData);
    const dataIn = await getPokemon(url);
    await settingState(dataIn.results);
  }

  useEffect(() => {
    props.setSecondaryCriteria(null)
    retrieveData();
  }, []);

  useEffect(() => {
    if (Object.keys(currentResult).length) {
      setIsLoading(false);
      console.log(currentResult);
      setWholeArray((prev) => {
        return currentResult;
      })
      setFilteredArray((prev) => {
        return currentResult;
      })
    }
  }, [currentResult]);


  useEffect(() => {
    console.log(input);
    setFilteredArray((prev) => wholeArray.filter((result) => result.name.includes(input)))
  }, [input])

  return (
    <>
      {isLoading && <div>LOADING</div>}
      {!isLoading && (
        <div className="page" id="search">
          <Nav
            additionalClasses={"dark-text"}
            data={{ value: "", content: `${props.searchCriteria}` }}
            prevPage={"/"}
            setSecondaryCriteria={props.setSecondaryCriteria}
          />
          <div className="search-inner">
          <Searchbar classname="searchsearch" setInput={setInput} input={input} />
            <div className="mini-button-container">
              {filteredArray.map((type) => (
                <MiniButton
                  setPrevPage={props.setPrevPage}
                  setExpectedDataLength={props.setExpectedDataLength}
                  finalizeSearch={props.finalizeSearch}
                  name={type.name}
                  url={type.url}
                  setSecondaryCriteria={props.setSecondaryCriteria}
                  searchCriteria={props.searchCriteria}
                  searchInput={props.searchInput} setSearchInput={props.setSearchInput}
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
