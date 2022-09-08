import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { ForgotPasswordAction } from '../../Actions/User';
import "./ForgotPassword.css";



export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPasswords, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [secondPage, setSecondPage] = useState(false);
    const dispatch = useDispatch();

    
    const ForgotPasswordFormSubmit = (e) => {
        e.preventDefault();
        dispatch(ForgotPasswordAction(email, newPasswords, confirmPassword));
    }
    const ForgotPasswordEmailFormSubmit = (e) => {
        e.preventDefault();
        setSecondPage(true);

    }
    return secondPage ? (<div className="ForgotPassword">
        <form className="ForgotPasswordForm" onSubmit={ForgotPasswordFormSubmit}>

            <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "cursive" }}>
                Social Private Talk
            </Typography>
            <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "fantasy", fontWeight: "bold", fontSize: "xx-large" }}>
                Set New Password
            </Typography>

            <input
                type="password"
                placeholder="enter new password...."

                value={newPasswords}
                onChange={(e) => {
                    setnewPassword(e.target.value);
                }}
                required />
            <input
                type="text"
                placeholder="enter confirm password...."

                value={confirmPassword}
                onChange={(e) => {
                    setconfirmPassword(e.target.value);
                }}
                required />
            <Button type="submit"> set new password </Button>
        </form>
    </div>
    )
    :
    (<div className="ForgotPassword">
        <form className="ForgotPasswordForm" onSubmit={ForgotPasswordEmailFormSubmit}>

                <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "cursive" }}>
                    Social Private Talk
                </Typography>
                <Typography variant="h3" style={{ padding: "2vmax", fontFamily: "fantasy", fontWeight: "bold", fontSize: "xx-large" }}>
                    forgot Password
                </Typography>

                <input
                    type="email"
                    placeholder="enter email...."

                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required />
                <Button type="submit">submit</Button>
            </form>
        </div>
        )
        ;
}
