import React, {  useState } from "react";
import "./Login.css";
import {  Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { lodeUser, loginUser } from "../../Actions/User"

import { useDispatch } from "react-redux";

const Login = () => {



  const dispatch = useDispatch();
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("demouser");

  const formSubmit = async (e) => {
    e.preventDefault();
    
    await dispatch(loginUser(email, password));
    // toast.success("login susscussfully!");
    dispatch(lodeUser());
    

  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={formSubmit}>

        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Private Talk
        </Typography>
        <input
          name="email"
          type="email"
          placeholder="enter your email "
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}

          required />
          <Button variant="contained" color="info" type="submit">Login</Button>
        <Link to="/forgot/password">
          <Typography variant="h6" >forgot password</Typography>
        </Link>
       
        <Link to="/register">
          <Typography variant="h6">Create account</Typography>
        </Link>
      </form>
      {/* <ToastContainer /> */}
        
    </div>
  );
};
export default Login;
