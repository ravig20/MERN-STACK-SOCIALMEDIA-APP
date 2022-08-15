import { Avatar, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./Updateprofile.css"

import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loader/Loder'
import {  UpdateProfileAction } from '../../Actions/User'
// import axios from 'axios';

export default function Updateprofile() {
   const dispatch = useDispatch();
    const {user,loading} = useSelector((store) => store.user)
    const {loading:profileUpdating} = useSelector((store) => store.userUpdatedProfile)
    const [name, setName] = useState(user.profile.name);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setavatarPrev] = useState(user.profile.avatar.url);
    const [email, setEmail] = useState(user.profile.email);

    const handleImageChange = (e) =>{
        const file =   e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = ()=>{
           if(Reader.readyState === 2){
             setavatarPrev(Reader.result);
             setAvatar(Reader.result);         
           };
        };
    };

    const profileUpdateHandler =  async (e) =>{
        e.preventDefault();
        await dispatch(UpdateProfileAction(name, email, avatar));
    }
  

  return (
    loading ? (
        <Loder/>
      ) : (
        <div className="updateProfile">
          <form className="updateProfileForm" onSubmit={profileUpdateHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
            Social Private Talk
            </Typography>
    
            <Avatar
              src={avatarPrev}
              alt="User"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
    
            <input type="file" accept="image/*" onChange={handleImageChange} />
    
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="updateProfileInputs"
              required
              onChange={(e) => setName(e.target.value)}
            />
    
            <input
              type="email"
              placeholder="Email"
              className="updateProfileInputs"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <Button disabled={profileUpdating} type="submit">
              Update
            </Button>
          </form>
        </div>)
  )
}
