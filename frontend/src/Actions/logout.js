import axios from "axios";

export const loginAction = () => async (dispatch) =>{
    try {
        dispatch({
            type:"logoutRequest"
        });
        await axios.get("api/v1/user/logout");
        dispatch({
            type:"logoutSuccess",
        });
      
        
    } catch (error) {
        dispatch({
            type:"logoutFailure",
            payload:error.message,
        });
    }
     

}
        