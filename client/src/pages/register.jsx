import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import RegisterForm from '../components/register';

const Register = () => {
    const user = useContext(UserContext);
    
    return (
        <div>
            <RegisterForm />
        </div>
    );
}

export default Register;
