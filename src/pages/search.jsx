import React from 'react';
import Nav from '../components/nav';

const Search = (props) => {
    return (
        <div className="page" id="search">
            <Nav additionalClasses={"dark"} data={{value: "", content: `${props.searchCriteria}`}}/>
            <div className="search-inner">
            </div>
        </div>
    );
}

export default Search;
