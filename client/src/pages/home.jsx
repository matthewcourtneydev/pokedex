import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';

const Home = () => {
    const user = useContext(UserContext);
    console.log(user)
    return (
        <div>
            Home Page
        </div>
    );
}

export default Home;
