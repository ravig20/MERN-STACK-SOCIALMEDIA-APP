import {configureStore} from "@reduxjs/toolkit"


import { CommentReducer, likeReducer, myPostReducer, NewImageUploadReducer } from "./reducers/Post";
import { allUserReducer, FindoneUserDataReducer, FindoneUserReducer, followReducer, postofFollowingReducer, searchUserReducer, UpdateProfilerReducer, UserReducers } from "./reducers/User";

const store = configureStore({
    reducer:{
        user:UserReducers,
        postofFollowing:postofFollowingReducer, // following users posts
        allUser:allUserReducer,
        like:likeReducer,
        Comment:CommentReducer,
        accountOwnerPost:myPostReducer,
        newImageUploadData:NewImageUploadReducer,
        userUpdatedProfile :UpdateProfilerReducer,
        FindoneUse: FindoneUserReducer,
        FindoneUserData: FindoneUserDataReducer,
        followUnfollow:followReducer,
        searchUser:searchUserReducer,
    }
})

export default store;