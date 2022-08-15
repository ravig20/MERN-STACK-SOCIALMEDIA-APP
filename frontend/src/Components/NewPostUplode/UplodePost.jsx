/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import "./UplodePost.css"
import { newImageUploadAction } from '../../Actions/post';
import { lodeUser } from '../../Actions/User';

export default function Uplodepost() {
  const dispatch = useDispatch();
  const { loading, uplodeImageMessage, error } = useSelector((store) => store.newImageUploadData)
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    }
  }
  const uplodeHandler = async (e) => {
    e.preventDefault();
    await dispatch(newImageUploadAction(image, caption));
    dispatch(lodeUser());
    

  }
  useEffect(() => {
    if (error) {
  
      dispatch({ type: "ImageUploadError" })
    }
    if (uplodeImageMessage) {
    
      dispatch({ type: "ImageUploadError" })
    }
  }, [dispatch, error, uplodeImageMessage]);

  return (
    <div className='newPost'>

      <form className='newPostForm' onSubmit={uplodeHandler} >

        <Typography variant="h3"> New Post </Typography>
        {image && <img src={image} alt="Post" />}
        <input type='file' accept="image/*" onChange={imageHandler} />
        <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)}
          style={{ color: "black", backgroundColor: "lightblue", width: "50%", marginBottom: "20px" }} />
        <Button disabled={loading} type="submit">Upload Post</Button>
      </form>

    </div>
  )
}
