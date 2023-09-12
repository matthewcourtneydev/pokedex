import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const RegisterForm = () => {
  const userData = useContext(UserContext);

  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const startRef = useRef();

  console.log(userData)

  const navigate = useNavigate();

  async function postUser(userData) {
    const response = await fetch("http://localhost:3002/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userData)
    });

    const userRes = response.json();

    console.log(userRes)
    return userRes
  }

  async function handleSubmit() {
    const user = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      starter: startRef.current.value,
    };

    if (passRef.current.value !== conPassRef.current.value) {
      console.log("ERROR HANDLE");
    } else {
      let postedUser = await postUser(user);
      localStorage.setItem("user", JSON.stringify(postedUser));
      navigate("/");
    }
  }

  return (
    <div id="login-form">
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
    </div>
  );
};

export default RegisterForm;
