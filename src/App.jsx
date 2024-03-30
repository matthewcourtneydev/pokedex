import "./App.scss";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/home";
import Search from "./pages/search";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import Nav from "./components/nav";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [searchCriteria, setSearchCriteria] = useState("Pokemon");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate()

  const selectSearch = (criteria) => {
    setSearchCriteria((prev) => criteria);
  };

  const updateInput = (input) => {
    setSearchInput((prev) => input)
  }

  useEffect(() => {
    if (searchCriteria !== "pokemon") {
      navigate("/search")
    }
  }, [searchCriteria])

  useEffect(() => {
    console.log(searchInput)
  }, [searchInput])

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home updateInput={updateInput} selectSearch={selectSearch} />} />
        <Route path={"/search"} element={<Search searchInput={searchInput} searchCriteria={searchCriteria} />} />
        <Route path={"/pokedex"} element={<Pokedex />} />
        <Route path={"/pokemon"} element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
