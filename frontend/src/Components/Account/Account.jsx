import React, { useEffect, useState } from "react";
import { getMyPostAction } from "../../Actions/post";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import "./Account.css";
import Post from "../Post/Post";
import Loder from "../Loader/Loder";
import { Link } from "react-router-dom";
import User from "../User/User";
import { loginAction } from "../../Actions/logout";
import { deleteMyAccountAction } from "../../Actions/User";


export default function Account() {
  const [ToggleFollowers,setToggleFollowers] = useState(false);
  const [ToggleFollowing,setToggleFollowing] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPostAction());
                        // change
  }, [dispatch]);

  const { loading, myPost } = useSelector((store) => store.accountOwnerPost);
  const { loading:userLoding, user} = useSelector((store) => store.user);
  const {loading:accountdelete, error:deleteaccounterror}  =  useSelector((store) => store.userUpdatedProfile);
  const logoutToMe = () =>{
      dispatch(loginAction());
      // alert("click me to log out");
  };
  
  const deleteMyAccountHandler = async () =>{
     await dispatch(deleteMyAccountAction());
     dispatch(loginAction());
    

  };
  if(deleteaccounterror){
    dispatch({
      type:"clearError"
    });
  }
  // 
  return loading === true && userLoding === true ? (
    <Loder />
  ) : (
    <div className="account">
      <div className="accountleft">
        {myPost && myPost.length > 0 ? (
          myPost.map((pic) => (
       
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
              isDelete={true}
              isAccount={true}
            />
          ))
        ) : (
          <Typography variant="h6"> No post to show </Typography>
        )}
      </div>

      <div className="accountright">
        <Avatar
          src={user.profile.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
          alt="name"
        />
        <Typography variant="h6">{user.profile.name}</Typography>
        <div>
          <button onClick={() =>setToggleFollowers(true)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.profile.followers.length}</Typography >

          <button onClick={() =>setToggleFollowing(true)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.profile.following.length}</Typography>

          <Typography> Post </Typography>

          <Typography>{user.profile.post.length}</Typography>

          <Button variant="contained" style={{
            backgroundColor:"rgb(33, 151, 236)",
          }} onClick={logoutToMe} >Logout</Button>

          <Button variant="contained" style={{
            marginTop:"1rem",
            marginBottom:"1rem",
          }}>
          <Link to="/update/profile"> Edit profile</Link>
          </Button>
          
          <Button variant="contained"  >
          <Link to="/update/password"> Change password</Link>
          </Button>

          <Button
            variant="text"
            onClick={deleteMyAccountHandler}
            disabled={accountdelete}
            style={{
              color: "red",
              margin: "2vmax",
            }}
          >

            {" "}
            Delete my profile{" "}

          </Button>
          
          <Dialog open={ToggleFollowers} onClose={() => setToggleFollowers(!ToggleFollowers)}>
        <div className="DialogBox">
          <Typography variant="h4"> Followers </Typography>
          {
            user && user.profile.followers.length > 0 ? (
              user.profile.followers.map((follower) =>(
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
             user && user.profile.following.length > 0 ? (
              user.profile.following.map((following) =>(
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
    </div>
  );
}
