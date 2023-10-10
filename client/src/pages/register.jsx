import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import RegisterForm from '../components/register';
import img from '../imgs/pokemon2.png'

const Register = () => {
    const user = useContext(UserContext);
    
    return (
        <div className='register-page page'>
            <div className="register-content">
                <img src={img} alt="" />
            <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
