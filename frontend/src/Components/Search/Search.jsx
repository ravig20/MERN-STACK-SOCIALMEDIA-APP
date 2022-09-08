import "./search.css";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import User from "../User/User";
import { searchUserAction } from "../../Actions/User";

function Search() {
  const dispatch = useDispatch();
  const {users} = useSelector((store)=>store.searchUser)
  const [searchName, setName] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUserAction(searchName))
  };

 
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          private talk
        </Typography>

        <input
          type="text"
          value={searchName}
          placeholder="search name..."
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button  type="submit">
          Search
        </Button>
      </form>
      {
        users ? ( <div className="searchResults">
        {users?.searchUser &&
          users?.searchUser.map((user) => (
            <User
              key={user?._id}
              userId={user?._id}
              name={user?.name}
              avatar={user?.avatar?.url}
            />
          ))}
      </div>) : null
      }
     
    </div>
  );
}

export default Search;