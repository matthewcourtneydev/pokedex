import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import RegisterForm from '../components/register';

const Register = () => {
    const user = useContext(UserContext);
    
    return (
        <div className='register-page'>
            <div className="register-content">
            <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
