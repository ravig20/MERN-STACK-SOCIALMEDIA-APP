import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Post.css";
import { Link } from "react-router-dom";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder,MoreVert } from "@mui/icons-material"
import { commentsAction, likeAction ,getMyPostAction, UpdateCaptionAction, PostDeleteAction} from "../../Actions/post";
import { getFollowingPost, lodeUser } from "../../Actions/User";
import User from "../User/User";
import Commentcard from "../CommentsCard/Commentcard";
// import User from "../User/User";


export default function Post({
  PostId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) {
  


  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user)

  const [isliked, setLike] = useState(false);
  const [checkLike, setCheckLike] = useState(false);
  const [checkComment, setcheckComment] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [toggeCaption, setToggleCaption] = useState(false);
  const [updateCaption, setUpdateCaption] = useState(caption);
 
 

  const likeHandler =  () => {
    setLike(!isliked);
    // setLikedCount(likes.length);
     dispatch(likeAction(PostId)); 
    if (isAccount) {
      dispatch(getMyPostAction());
    } else {

      dispatch(getFollowingPost());
    }
  }
 const updateCaptionHandler = (e) => {
      e.preventDefault();
      dispatch(UpdateCaptionAction(PostId, updateCaption));
      dispatch(getMyPostAction());

 }
 const postDeleteHandler = async () => {
  
    dispatch(PostDeleteAction(PostId));
   await dispatch(getMyPostAction());
    dispatch(lodeUser());
  
  

}
 
  // post comments
  
  const commentsHandler = async (e)=> {
    e.preventDefault();
      dispatch(commentsAction(PostId,postComment))
     if (isAccount) {
      dispatch(getMyPostAction());
    } else {

      dispatch(getFollowingPost()); 
    }
  
  }
  
  useEffect(() => likes.forEach(item => {
   
    if (item._id === user.profile._id) {
      setLike(true);
    }
  }), [likes, user.profile._id]);





  return (

    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={()=> setToggleCaption(true) } >
            <MoreVert />
          </Button>
        ) : null}
      </div>
      
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >{caption}</Typography>

      </div>
      <button style={{
        border: "none",
        backgroundColor: "white",
        cursor: "pointer",
        margin: "1vmx 2vmx"

      }}
        onClick={() => setCheckLike(!checkLike)}
      >
        <Typography>{`${likes.length} likes`}</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={likeHandler} style={{ color: "red" }} >
          {isliked ? <Favorite /> : <FavoriteBorder />}
        </Button>
        <Button onClick={()=>setcheckComment(!checkComment)} >
          <ChatBubbleOutline />
        </Button>
        <Button onClick={postDeleteHandler}>
          {isDelete ? <DeleteOutline /> : null}
        </Button>
      </div>
      <Dialog open={checkLike} onClose={() => setCheckLike(!checkLike)}>
        <div className="DialogBox">
          <Typography variant="h4"> liked by</Typography>
          {
            likes.map(user=>(
             
          <User
              key={user._id}
            userId={user._id}
            name={user.name}
            avatar={user.avatar.url} // change

          />
            ))
          }
        </div>
      </Dialog>
      <Dialog open={toggeCaption} onClose={() => setToggleCaption(!toggeCaption)}>
        <div className="DialogBox">
          <Typography variant="h4"> edit Caption </Typography>
         
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input 
            type="text"
            value={updateCaption}
            onChange={(e)=>setUpdateCaption(e.target.value)} 
            placeholder="Edit Caption..."
            required
            />
            <Button type="submit" variant="contained">
              Update Caption
            </Button>

          </form>

        </div>
      </Dialog>
      <Dialog open={checkComment} onClose={() => setcheckComment(!checkComment)}>
        <div className="DialogBox">
          <Typography variant="h4">comments </Typography>
          <form className="commentForm" onSubmit={commentsHandler}>
            <input
            type="text"
            placeholder="Please enter your comment"
            onChange={(e)=>setPostComment(e.target.value)}
            required
            />
            <Button type="submit" variant="contained">
              add
            </Button>
          </form>
          {
            comments.length>0 ? comments.map((comment) =>(
              <Commentcard
              key={comment._id}
              userID= {comment.user._id}
               name= {comment.user.name}
                avatar = {comment.user.avatar.url}
                 comment = {comment.comment}
                  commentID ={comment._id}
                   postID ={PostId}
                   isAccount ={isAccount}
              />
            )) :<Typography>no comment at</Typography>
          }


        </div>
      </Dialog>

    </div>
  );
}
