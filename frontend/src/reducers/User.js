import {createReducer} from "@reduxjs/toolkit"

const initialState ={
    isAuthenticated: false,
};
export const UserReducers =  createReducer(initialState,{
        LoginRequest: (state)=>{
            state.loading = true;
            state.isAuthenticated  =false        
        },
        LoginSuccess: (state,action)=>{
            state.loading = false; 
            state.user = action.payload;
           state.isAuthenticated = true
        },
        LoginFailure: (state ,action)=>{
            state.loading = false; 
            state.error = action.payload;
            state.isAuthenticated  =false   
        },
        RegisterRequest: (state)=>{
            state.loading = true;
            state.isAuthenticated  =false   
        },
        RegisterSuccess: (state,action)=>{
            state.loading = false; 
            state.user = action.payload;
            state.isAuthenticated = true
        },
        RegisterFailure: (state ,action)=>{
            state.loading = false; 
            state.error = action.payload;
            state.isAuthenticated  =false   
        },
        LodeUserRequest: (state)=>{
            state.loading = true;
            state.isAuthenticated  =false   
        },
        LodeUserSuccess: (state,action)=>{
            state.loading = false; 
            state.user = action.payload;
            state.isAuthenticated = true
        },
        LodeUserFailure: (state ,action)=>{
            state.loading = false; 
            state.error = action.payload;
            state.isAuthenticated  =false   
        },
        logoutRequest: (state , action) =>{
            state.loading = true;
    
        },
        logoutSuccess: (state ) =>{
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            
    
        },
        logoutFailure: (state , action) =>{
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = true;
    
        },
        
        clearError:(state,action)=>{
            state.error = null;
        },

    })

export const postofFollowingReducer = createReducer(initialState,{
    postofFollowingRequest: (state,action)=>{
        state.loading = true;

    },
    postofFollowingSuccess:(state,action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    postofFollowingFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },
});


export const allUserReducer = createReducer(initialState,{
    allUserRequest: (state,action)=>{
        state.loading = true;

    },
    allUserSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    allUserFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    
    clearError:(state,action)=>{
        state.error = null;
    },
});
//////////////////////////////
export const FindoneUserReducer = createReducer(initialState,{
    FindoneUserRequest: (state,action)=>{
        state.loading = true;

    },
    FindoneUserSuccess:(state,action)=>{
        state.loading = false;
        state.user = action.payload;
    },
    FindoneUserFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    
    clearError:(state,action)=>{
        state.error = null;
    },
});
export const FindoneUserDataReducer = createReducer(initialState,{
    FindoneUserDataRequest: (state,action)=>{
        state.loading = true;

    },
    FindoneUserDataSuccess:(state,action)=>{
        state.loading = false;
        state.user = action.payload;
    },
    FindoneUserDataFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    
    clearError:(state,action)=>{
        state.error = null;
    },
});

export const UpdateProfilerReducer = createReducer(initialState,{
    UpdateProfilerRequest: (state,action)=>{
        state.loading = true;

    },
    UpdateProfilerSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    UpdateProfilerFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    UpdatepasswordRequest: (state,action)=>{
        state.loading = true;

    },
    UpdatepasswordSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    UpdatepasswordFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    deleteMyAccountRequest: (state,action)=>{
        state.loading = true;

    },
    deleteMyAccountSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    deleteMyAccountFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    forgotpasswordRequest: (state,action)=>{
        state.loading = true;

    },
    forgotpasswordSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    forgotpasswordFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },
});
 

export const followReducer = createReducer(initialState,{
    FollowRequest: (state,action)=>{
        state.loading = true;

    },
    FollowSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    FollowFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state,action)=>{
        state.error = null;
    },
})

export const searchUserReducer = createReducer(initialState,{
        SearchRequest: (state,action)=>{
            state.loading = true;
        },
        SearchSuccess:(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        },
        SearchFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        clearError:(state,action)=>{
            state.error = null;
        },

});