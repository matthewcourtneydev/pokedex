import React from "react";
import LoginForm from "../components/login";
import img from "../imgs/pokemon2.png";

const Login = () => {
  return (
    <div className="login-page page">
      <div className="login-content">
        <img src={img} alt="" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
