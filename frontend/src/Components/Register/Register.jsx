import { Avatar, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import{ useDispatch, useSelector } from "react-redux";
import { lodeUser, RegisterUserAction } from '../../Actions/User';
import "./Register.css"

export default function Register() {
    
      const dispatch = useDispatch();
      const {loading } =  useSelector((store)=> store.user);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const setAvatarHandler = (e)=>{
         const file =   e.target.files[0];
         const Reader = new FileReader();
         Reader.readAsDataURL(file);
         Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            };
         };
      };
  

      const formSubmit = async (e) => {
        e.preventDefault();
        await dispatch(RegisterUserAction(name,avatar, email, password));
        dispatch(lodeUser());
       
      };
    return (
        <div className="register">
            <form className="registerForm" onSubmit={formSubmit}>

                <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "fantasy" , }}>
                    Social Private Talk
                </Typography>
                <Avatar
                src={avatar}
                alt={name}
                sx={{ height:"10vmax", width:"10vmax" }}
                
                />
              
                <input type="file" accept="image/*" onChange={setAvatarHandler}/>
                <input
                    name="name"
                    type="text"
                    placeholder="enter your name... "
                    className="registerInputs"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="enter your email "
                    className="registerInputs"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="registerInputs"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Link to="/"  style={{fontFamily:"cursive"}}> Already have account? Login here!</Link> 
                <Button variant="contained" colour="info" disabled={loading} type="submit"> Register here</Button>
            </form>

        </div>


    )
}
