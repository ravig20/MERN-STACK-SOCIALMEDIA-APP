const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: "backend/config/config.env" });
// using middleware

app.use(express.json({limit:"50mb"}));
app.use(
  express.urlencoded({
    extended: true,
    limit:"50mb",
  })
);

app.use(cookieParser());

// IMPORT  routes
const postRoutes = require("./rought/Post");
const usersRoutes = require("./rought/User");

//using routes
app.use("/api/v1", postRoutes);
app.use("/api/v1", usersRoutes);

// By default value of  process.env.NODE_ENV is Production in heroku..
	// -------------------------------- deployment --------------------------------

  const __dirname1 = path.resolve();
  if(process.env.NODE_ENV === "production"){
    console.log("Deployment")
    app.use(express.static(path.join(__dirname1,"/frontend/build")));
    
    app.get("*",(req, res) => {
      res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    });
    
  }else {
    console.log(__dirname1,"what is this");
        console.log("something went wrong in server js file");
        app.get("/", (req,res)=>{
          res.send("api running ")
      });
  }
  
  // -------------------------------- deployment --------------------------------
  
module.exports = app;



