import {createReducer} from "@reduxjs/toolkit"
const initialState = {};
export const likeReducer = createReducer(initialState,{
    likeRequest:(state)=>{
        state.loading = true;
    },
    likeSusscess:(state,action)=>{
        state.loading = false;
        state.like = action.payload;
    },
    likeFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state,action)=>{
        state.error = null; 
    },
    clearMessages:(state,action)=>{
        state.message = null;
    }
});
export const CommentReducer = createReducer(initialState,{
    CommentRequest:(state)=>{
        state.loading = true;
    },
    CommentSusscess:(state,action)=>{
        state.loading = false;
        state.comment = action.payload;
    },
    CommentFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },
    clearMessages:(state,action)=>{
        state.message = null;
    }
});
export const DeleteReducer = createReducer(initialState,{
    DeleteRequest:(state)=>{
        state.loading = true;
    },
    DeleteSusscess:(state,action)=>{
        state.loading = false;
        state.comment = action.payload;
    },
    DeleteFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    DeleteError:(state,action)=>{
        state.error = null;
    },
    DeleteMessages:(state,action)=>{
        state.message = null;
    }
});
export const NewImageUploadReducer = createReducer(initialState,{
    ImageUploadRequest:(state)=>{
        state.loading = true;
    },
    ImageUploadSusscess:(state,action)=>{
        state.loading = false;
        state.uplodeImageMessage = action.payload;
    },
    ImageUploadFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    ImageUploadError:(state)=>{
        state.error = null;
    },
    UpdateCaptionRequest:(state)=>{
        state.loading = true;
    },
    UpdateCaptionSusscess:(state,action)=>{
        state.loading = false;
        state.uplodeImageMessage = action.payload;
    },
    UpdateCaptionFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    UpdateCaptionError:(state)=>{
        state.error = null;
    },
    DeletePostRequest:(state)=>{
        state.loading = true;
    },
    DeletePostSusscess:(state,action)=>{
        state.loading = false;
        state.uplodeImageMessage = action.payload;
    },
    DeletePostFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    DeletePostError:(state)=>{
        state.error = null;
    },


});
export const myPostReducer = createReducer(initialState,{
    myPostReducerRequest: (state) =>{
        state.loading = true;
    },
    myPostReducerSuccess: (state,action) =>{
        state.loading = false;
        state.myPost =  action.payload;
    },
    myPostReducerFailure: (state,action) =>{
        state.loading = false;
        state.error =  action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },

})
export const userPostReducer = createReducer(initialState,{
    userPostRequest: (state) =>{
        state.loading = true;
    },
    userPostSuccess: (state,action) =>{
        state.loading = false;
        state.myPost =  action.payload;
    },
    userPostFailure: (state,action) =>{
        state.loading = false;
        state.error =  action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },

})