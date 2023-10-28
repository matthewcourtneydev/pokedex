import React, { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const RegisterForm = () => {
  const userData = useContext(UserContext);

  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const startRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.user && userData.user.email) {
      navigate("/");
    }
  }, []);

  async function postUser(userData) {
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const userRes = response.json();
    return userRes;
  }

  async function logUserInAfterPost(postedUser) {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postedUser),
    });

    const loggedInUserRes = response.json();
    return loggedInUserRes;
  }

  async function handleSubmit() {
    const user = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      starter: startRef.current.value,
    };

    if (passRef.current.value !== conPassRef.current.value) {
    } else {
      try {
        let postedUser = await postUser(user);
        if (postedUser) {
          debugger;
          let loggedInUser = await logUserInAfterPost(postedUser);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          window.location.reload();
          navigate("/");
        } 
      } catch (err) {
        console.log(err.message, "ERR MESSAGE");
      }
    }
  }

  return (
    <div id="register-form" className="form">
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" ref={userRef} />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" ref={emailRef} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={passRef} />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="password" name="confirm-password" ref={conPassRef} />
      <label htmlFor="starter">Starter:</label>
      <select name="starter" id="starter" ref={startRef}>
        <option value="001">Bulbasaur</option>
        <option value="004">Charmander</option>
        <option value="007">Squirtle</option>
      </select>
      <button onClick={handleSubmit}>Sign up</button>
      <p>Already a member? Log in <a href="/login">Here</a>.</p>
    </div>
  );
};

export default RegisterForm;
