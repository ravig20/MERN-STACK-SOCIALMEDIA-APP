import React, { useEffect, useState } from "react";
// import { useState } from "../../Actions/post"; //  getMyPostAction,

import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Dialog, Avatar } from "@mui/material";

import Post from "../Post/Post";
import Loder from "../Loader/Loder";
import { useParams } from "react-router-dom";
import User from "../User/User";
import { FindUserByIdAction, FindUserdataByIdAction, followUnfollowAction } from "../../Actions/User";
// import { getMyPostAction } from "../../Actions/post";



const Userprofile = () => {
  const [ToggleFollowers, setToggleFollowers] = useState(false);
  const [ToggleFollowing, setToggleFollowing] = useState(false);
  const [userfollowingMe, setFollowing] = useState();
  const [myProfile, setmyProfile] = useState(false);
  // const { loading, myPost } = useSelector((store) => store.accountOwnerPost);
  const { loading: userLoding, user: myProfileID } = useSelector((store) => store.user);
  const { loading: finduserpost, user: userPostArray } = useSelector((store) => store.FindoneUse);
  const { loading, user } = useSelector((store) => store.FindoneUserData);
  // const  { loading:followUnfolloWLoading, user:FollowMessage } = useSelector((store) => store.followUnfollow);
  

  const params = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(FindUserByIdAction(params.id));
  //   dispatch(FindUserdataByIdAction(params.id));  
  //         // change
  // }, [dispatch,FindUserByIdAction,FindUserdataByIdAction,params.id]);
 
  useEffect( () => {
     dispatch(FindUserByIdAction(params.id));
    dispatch(FindUserdataByIdAction(params.id));
    if (myProfileID.profile._id === params.id) {
      setmyProfile(true);
    }else{
      setmyProfile(false);
    }
   
     myProfileID.profile.following.forEach(obj=>{
       if(obj._id === params.id) {
         setFollowing(true);
       }
      
      })
      dispatch(FindUserdataByIdAction(params.id));
  }, [dispatch, params.id, myProfileID.profile._id, myProfileID.profile.following]);


  const followingHandler = async () => {
   await dispatch(followUnfollowAction(params.id));
    setFollowing(!userfollowingMe);
    dispatch(FindUserdataByIdAction(params.id));
  }

  return userLoding === false && finduserpost === false && loading === false ? 
    (
      <div className="account">
        <div className="accountleft">
          {userPostArray && userPostArray.length > 0 ? (
            userPostArray.map((pic) => (
              <Post
                key={pic._id}
                PostId={pic._id}
                postImage={pic.image.url}
                caption={pic.caption}
                likes={pic.like}
                comments={pic.comments}
                ownerImage={pic.owner.avatar.url}
                ownerName={pic.owner.name}
                ownerId={pic.owner._id}
                isDelete={myProfile}
                isAccount={myProfile}
              />
            ))
          ) :
            (
              <Typography variant="h6"> No post to show </Typography>
            )}
        </div>
  
        {
          loading ? (<Loder />) : ( <div className="accountright">
          
          <Avatar
            src={user.avatar.url}
            sx={{ height: "8vmax", width: "8vmax" }}
            alt="name"
          />
  
          <Typography variant="h6">{user.name}</Typography>
  
          <div>
            <button onClick={() => setToggleFollowers(true)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers.length}</Typography >
  
            <button onClick={() => setToggleFollowing(true)}>
              <Typography>Following</Typography>
            </button>
            <Typography>{user.following.length}</Typography>
  
            <Typography> Post </Typography>
  
            <Typography>{user.post.length}</Typography>
  
            {
              myProfile ? null : (
                <Button variant="contained" onClick={followingHandler} >
                  {
                    userfollowingMe ? "unfollow":"follow" 
                  }
                </Button>
              )
            }
  
            <Dialog open={ToggleFollowers} onClose={() => setToggleFollowers(!ToggleFollowers)}>
              <div className="DialogBox">
                <Typography variant="h4"> Followers </Typography>
                {
                  user && user.followers.length > 0 ? (
                    user.followers.map((follower) => (
                      <User
                        key={follower._id}
                        userId={follower._id}
                        name={follower.name}
                        avatar={follower.avatar.url} // Change avatar
                      />
                    ))
                  )
                    :
                    <Typography> Opss! sorry you not yet  have any follower</Typography>
                }
              </div>
            </Dialog>
  
            <Dialog open={ToggleFollowing} onClose={() => setToggleFollowing(!ToggleFollowing)}>
              <div className="DialogBox">
                <Typography variant="h4"> Following </Typography>
                {
                  user && user.following.length > 0 ? (
                    user.following.map((following) => (
                      <User
                        key={following._id}
                        userId={following._id}
                        name={following.name}
                        avatar={following.avatar.url} // Change avatar
                      />
                    ))
                  )
                    :
                    <Typography> Opss! sorry you have yet no follower</Typography>
                }
              </div>
            </Dialog>
  
            </div>
          </div>
          )
        }
        
       
       
      </div>
  
    )
  
    :(<Loder />);
  
}

export default Userprofile;