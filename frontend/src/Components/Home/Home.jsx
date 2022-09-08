// import { Button, Typography } from '@mui/material';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPost } from '../../Actions/User';
import Loder from '../Loader/Loder';
import Post from '../Post/Post';
import User from '../User/User';
import "./home.css"


function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  }, [dispatch])

  const pics = useSelector((store) => store.postofFollowing);
  
  const {users} = useSelector((store) => store.allUser);


  
  return (
    <div className='home'>
      <div className="homeleft">
       
        {pics.posts === undefined || pics?.posts?.length === 0? <Typography>NO post yet!!</Typography>: pics?.posts?.map((post) => (
          <Post
          
          PostId={post?._id}
          key={post?._id}
          postImage={post?.image?.url}
          caption={post?.caption}
          likes = {post?.like}
          comments = {post?.comments}
          ownerImage ={post?.owner.avatar.url}
          ownerName ={post?.owner.name}
          ownerId = {post?.owner._id}
          isDelete = {false}
          isAccount = {false}
         
        />
        ) ).reverse()} 


      </div>
      <div className="homeright">
     {users === undefined ? <Loder/> : users.map((user) =>(
      <User
      key={user?._id}
      userId={user?._id}
      name={user?.name}
      avatar={user?.avatar.url}
    />
     ))}
             
      </div>


    </div>
  )
}

export default Home;