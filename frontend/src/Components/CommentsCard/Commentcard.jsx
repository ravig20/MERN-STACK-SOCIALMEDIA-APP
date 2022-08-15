import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material"


import "./commentcard.css";
import { useDispatch, useSelector } from 'react-redux';
import { DeletetsAction } from '../../Actions/post';
import { getFollowingPost } from '../../Actions/User';
export default function Commentcard({
  userID,
  name,
  avatar,
  comment,
  commentID,
  postID,
  isAccount,
}) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const deleteHandler = () =>{
        

      dispatch(DeletetsAction(postID,commentID))
      if (isAccount) {

      } else {
  
        dispatch(getFollowingPost()); //RErender
      }
    
  }
  return (

    <div className="commentUser" style={{ minWidth: "6vmax" }}>
      <Link to={`/user/${userID}`}>
        <img scr={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {
        
        isAccount ? (<Button onClick={deleteHandler}>
          <Delete />
        </Button>) : (userID === user.profile._id) ? (<Button onClick={deleteHandler} >
          <Delete />
        </Button>) : null
      }

    </div>

  )
}
