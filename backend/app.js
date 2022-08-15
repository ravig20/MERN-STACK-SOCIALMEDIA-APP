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

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req, res) => {
  res.sendFile(path.resolve(__dirname,"../frontend/build/static/index.html"));
 });
module.exports = app;



