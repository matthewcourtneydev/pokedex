import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';

const Home = () => {
    const user = useContext(UserContext);
    console.log(user)
    return (
        <div>
            <h1>HomePage</h1>
        </div>
    );
}

export default Home;
