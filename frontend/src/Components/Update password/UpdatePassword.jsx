import { Button, Typography } from "@mui/material";
import { useState } from "react";
import "./UpdatePassword.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { UpdatepasswordAction } from "../../Actions/User";


const Updatepassword = () => {
    const dispatch = useDispatch();
    const {loading , error} = useSelector((store) => store.userUpdatedProfile);

    const [oldPasswords, setOldPassword] = useState("");
    const [newPasswords, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordFormSubmit = async (e) => {
        e.preventDefault();
     
        if (newPasswords === confirmPassword) {
            dispatch(UpdatepasswordAction(oldPasswords, newPasswords, confirmPassword));
        };
       
       
    };
        if(error) {
            dispatch({ type: "clearError"});
        };

        return (
            <div className="Updatepassword">
                <form className="UpdatepasswordForm" onSubmit={updatePasswordFormSubmit}>

                    <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "cursive" }}>
                        Social Private Talk
                    </Typography>
                    <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "fantasy", fontWeight: "bold", fontSize: "xx-large" }}>
                        Update Password
                    </Typography>
                    <input
                        name="old_password"
                        type="text"
                        placeholder="old password...."
                        autoComplete="off"
                        value={oldPasswords}
                        onChange={(e) => {
                            setOldPassword(e.target.value);
                        }}
                        required
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder=" new password .... "
                        value={newPasswords}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="confirm password ...."
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        required />

                    <Button disabled={loading} type="submit">Update password</Button>


                </form>
            </div>
        );
    };
    export default Updatepassword;
