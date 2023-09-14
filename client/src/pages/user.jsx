import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

const User = () => {
    const userData = useContext(UserContext);
    const user = userData.user;
    return (
        <div>
            <h1>{user.username}</h1>
            <h2>{user.email}</h2>
            <p>{user.starter}</p>
        </div>
    );
}

export default User;
