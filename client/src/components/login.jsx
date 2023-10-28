import React, { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/userContext";

const LoginForm = () => {
    const userData = useContext(UserContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.user && userData.user.email) {
          navigate("/");
        }
      }, []);

    async function login(loginInfo) {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginInfo),
          });
      
          const loggedInUserRes = response.json();
          return loggedInUserRes;
    }

    async function handleLogin() {
        const loginInfo = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        const loggedInUser = await login(loginInfo)
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location.reload();
        navigate("/");
    }
    return (
        <div id="login-form" className='form'>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={emailRef}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordRef}/>
            <button onClick={handleLogin}>Sign In</button>
            <p>Not a member? Register <a href="/register">Here</a>.</p>
        </div>
    );
}

export default LoginForm;
