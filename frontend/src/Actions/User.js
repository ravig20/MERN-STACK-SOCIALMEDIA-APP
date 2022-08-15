import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const user = {
      email: email,
      password: password
    }

    const { data } = await axios.post(
      "/api/v1/login",
      user,
      {
        headers: { "Content-Type": "application/json" },
      }
    );



    dispatch({
      type: "LoginSuccess",
      payload: data
    });

  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};
export const RegisterUserAction = (name, avatar, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
     

    const { data } = await axios.post(
      "/api/v1/register",
      { name, avatar, email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "RegisterSuccess",
      payload: data
    });

  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};


export const lodeUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LodeUserRequest"
    })
    const { data } = await axios.get("api/v1/me/profile");
   
    dispatch({
      type: "LodeUserSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "LodeUserFailure",
      payload: error.response.data.message,
    })
  }
}


export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "postofFollowingRequest",

    });
    const { data } = await axios.get("/api/v1/posts");
    
    dispatch({
      type: "postofFollowingSuccess",
      payload: data.followingUserPosts,

    });
  } catch (error) {
    dispatch({
      type: "postofFollowingFailure",
      payload: error.response.data.message,
    })

  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUserRequest",

    });
    const users = await axios.get("/api/v1/all/users");
  
    dispatch({
      type: "allUserSuccess",
      payload: users.data.user,

    });
  } catch (error) {
    dispatch({
      type: "allUserFailure",
      payload: error.response.data.message,
    })

  }
}
export const deleteMyAccountAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteMyAccountRequest",

    });
    const {data} = await axios.delete("/api/v1/profile/delete/Profile");
  
    dispatch({
      type: "deleteMyAccountSuccess",
      payload: data,

    });
  } catch (error) {
    dispatch({
      type: "deleteMyAccountFailure",
      payload: error.response.data.message,
    })

  }
}

export const UpdateProfileAction = (name, email, avatar) => async (dispatch) => {

  try {
   
    dispatch({
      type: "UpdateProfilerRequest",
    });

    const {data} = await axios.put("/api/v1/profile/update",
    {
      name, email, avatar
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
   
    dispatch(
      {
        type: "UpdateProfilerSuccess",
        payload: data,
      }
    );
  } catch (error) {
    
    dispatch({
      type: "UpdateProfilerFailure",
      payload: error.message
    });
  }
}


export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const UpdatepasswordAction = (oldPasswords, newPasswords, confirmPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdatepasswordRequest",
    });

    const { data } = await axios.put(
      "/api/v1/login/update/password",
      {oldPasswords, newPasswords, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
 

    dispatch({
      type: "UpdatepasswordSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UpdatepasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const ForgotPasswordAction = (email, newPasswords, confirmPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotpasswordRequest",
    });

    const { data } = await axios.put(
      "/api/v1/login/forget/Password",
      {email, newPasswords, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotpasswordSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "forgotpasswordFailure",
      payload: error.response.data.message,
    });
  }
};
// 
export const FindUserByIdAction = (id) => async (dispatch) => {
  
  try {
    dispatch({
      type: "FindoneUserRequest",
    });
    const {data} = await axios.get(`/api/v1/userPost/${id}`);

   
    dispatch({
      type: "FindoneUserSuccess",
      payload: data.posts,
    });
    
  } catch (error) {
    dispatch({
      type: "FindoneUserFailure",
      payload: error.response.data.message,
    });
  }
}


export const FindUserdataByIdAction = (id) => async (dispatch) => {
  console.log("FindUserdataByIdAction running.....")
  try {
    dispatch({
      type: "FindoneUserDataRequest",
    });
    const {data} = await axios.get(`/api/v1/user/profile/${id}`);
    console.log("api data here ",data.user_ProfileData);
   
    dispatch({
      type: "FindoneUserDataSuccess",
      payload: data.user_ProfileData,
    });
    console.log(" FindUserdataByIdAction running done.....");
  } catch (error) {
    dispatch({
      type: "FindoneUserDataFailure",
      payload: error.response.data.message,
    });
  }
}


export const followUnfollowAction = (user) => async (dispatch) =>{
  try {
    dispatch({
      type:"FollowRequest",

    });
    const {data} = await axios.get(`/api/v1/follow/${user}`);
    console.log(data);
    dispatch({
      type:"FollowSuccess",
      payload: data,
    });

    
  } catch (error) {
    
    dispatch({
      type:"FollowFailure",
      payload: error.response.data.message,
    });
    
  }
   
}

export const searchUserAction = (searchName) => async (dispatch) => {
      try {
          dispatch({
            type:"SearchRequest"
          })
          
          const {data} = await axios.get(`/api/v1/search/?name=${searchName}`);
          dispatch({
            type:"SearchSuccess",
            payload:data,
          })
      } catch (error) {
        dispatch({
          type:"SearchFailure",
          payload: error.response.data.message,
        })
      }
};