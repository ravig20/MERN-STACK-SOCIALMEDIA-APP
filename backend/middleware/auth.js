const userModels = require("../models/User");
const jwt = require('jsonwebtoken');
// const cookies = require("cookie-parser");
exports.isAuthenticate = async function (req, res, next) { 
        try {
            
            if (!req.cookies.token){
             return res.status(401).json({
                 success: false,
                 message: " please login first"
             })
            }
             const {_id} = await jwt.verify(req.cookies.token ,process.env.JWT_SECRET_KEY);
            //  console.log("this is decoded",_id); 
             
              req.user =  await userModels.findById(_id);
                // console.log("this is a finde user",req.user);// done here
             next();
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: "some thing went wrong",
            })
            
        }
   };

   