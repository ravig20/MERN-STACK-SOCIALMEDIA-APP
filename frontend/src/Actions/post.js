import axios from "axios";

export const likeAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`api/v1/post/like/${id}`);
   
    dispatch({
      type: "likeSusscess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
    });
  }
};

export const commentsAction = (id, commentdata) => async (dispatch) => {

  try {
    dispatch({
      type: "CommentRequest",
    });
    const {data} = await axios.put(
      `api/v1/post/comment/${id}`,
      {
        comment: commentdata
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
   
    dispatch({
      type: "CommentSusscess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CommentFailure",
      payload: error.message,
    });
  }
};
export const DeletetsAction = (id,commentID) => async (dispatch) => {
 
try {
  dispatch({
    type: "DeleteRequest",
  });
  const {data} = await axios.delete(
    `api/v1/post/comment/${id}`,
    {
      commentId:commentID,
    }
  );
  
  dispatch({
    type: "DeleteSusscess",
    payload: data,
  });
} catch (error) {
  dispatch({
    type: "DeleteFailure",
    payload: error.message,
  });
}
};
export const newImageUploadAction = (image,caption) => async (dispatch) => {
 
  try {
    dispatch({
      type: "ImageUploadRequest",
    });
    const {data} = await axios.post(
      `api/v1/post/upload`,
      {
        image,
        caption
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("action uploaded by api",data);
    
    dispatch({
      type: "ImageUploadSusscess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ImageUploadFailure",
      payload: error.message,
    });
  }
  };

  
export const getMyPostAction = () => async (dispatch)=>{
  try {
    dispatch({
      type:"myPostReducerRequest"
      
    })
    const {data} = await axios.get("api/v1/me/profile");
    // console.log("api call", data);
    dispatch({
      type:"myPostReducerSuccess",
      payload:data.posts

    })
  } catch (error) {
      dispatch({
        type:"myPostReducerFailure",
        payload: error.message,
      })
  } 
}
export const UpdateCaptionAction = (id, caption) => async (dispatch)=>{
  try {
    dispatch({
      type:"UpdateCaptionRequest"
      
    })
    const {data} = await axios.put(`api/v1/post/update/caption/${id}`,{
      caption
    },
    {
      headers: {
        "content-type": "application/json"
      },
    });
    // console.log("api call", data);
    dispatch({
      type:"UpdateCaptionSusscess",
      payload:data.message,

    })
  } catch (error) {
      dispatch({
        type:"UpdateCaptionFailure",
        payload: error.message,
      })
  } 
}

export const PostDeleteAction = (id) => async (dispatch)=>{
  try {
    dispatch({
      type:"DeletePostRequest"
      
    })
    const {data} = await axios.delete(`api/v1/post/${id}`)
    // console.log("api call", data);
    dispatch({
      type:"DeletePostSusscess",
      payload:data.message,

    })
  } catch (error) {
      dispatch({
        type:"DeletePostFailure",
        payload: error.message,
      })
  } 
}


export const getUserPostAction = () => async (dispatch)=>{
  try {
    dispatch({
      type:"userPostRequest"
      
    })
    const {data} = await axios.get("api/v1/me/profile");
    // console.log("api call", data);
    dispatch({
      type:"userPostSuccess",
      payload:data.posts

    })
  } catch (error) {
      dispatch({
        type:"userPostFailure",
        payload: error.message,
      })
  } 
}
