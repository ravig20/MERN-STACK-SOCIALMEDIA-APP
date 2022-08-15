import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css";
import { AccountCircle, AccountCircleOutlined, Add, AddOutlined, Home, HomeOutlined, Search, SearchOutlined } from "@mui/icons-material"

 const Footer = () => {
  const[tab, setTab] = useState(window.location.pathname); 
  return (
    <div className='footer'>
      <Link to="/" onClick={() =>setTab("/")}>
         {tab==="/"?<Home style={{color: "white"}} />:<HomeOutlined/>}
      </Link>

      <Link  to="/newpost" onClick={() =>setTab("/newpost")}>
       {tab ==="/newpost"?<Add style={{color: "white"}} />:<AddOutlined/>}
      </Link>

      <Link  to="/search" onClick={() =>setTab("/search")}>
       {tab==="/search"?<Search style={{color: "white"}} />:<SearchOutlined/>}
      </Link>
      
      <Link  to="/account" onClick={() =>setTab("/account")}>
        {tab==="/account"?<AccountCircle style={{color: "white"}} />:<AccountCircleOutlined/>}
      </Link>

     
      
    </div>
  )
}
export default Footer;