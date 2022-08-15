const userModels = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");


// =>> user singUP route
exports.register = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const { name,avatar, email, password } = req.body;

    let user = await userModels.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "you are already registered please try another email id",
      });
    }
    const myCloude =  await cloudinary.v2.uploader.upload(avatar,{
      folder:"Avatar",      
    });
    user = await userModels.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloude.public_id ,
        url: myCloude.secure_url  ,
      },
    });
    function generateToken() {
      return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    }
    const token = generateToken();
   
    res.status(201).cookie(`token`, token, options).json({
      success: true,
      message: "Congratulations successfully signup",
      token,
      user,
    });
   
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ==>> login route


exports.login = async function (req, res) {
  try {

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const { email, password } = req.body;
    // console.log(email,password);
    const user = await userModels.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({
        email,
        password,
        success: false,
        message: "User dose not  exists in data base .",
      });
    }

    // check password is match || not
    let isPassword = await bcrypt.compare(password, user.password);
    // console.log(isPassword);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match please forget the Password",
      });
    }

    // creating token
    function generateToken() {
      return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    }
    const token = generateToken();

    res.status(200).cookie(`token`, token, options).json({
      success: true,
      message: "welcome to private talk",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =>> logout route
exports.logout = async function (req, res) {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res.status(200).cookie(`token`, null, options).json({
      success: true,
      message: "log out successfully",

    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};  


// ==> follow or unfollow a user
exports.followUser = async function (req, res) {
  try {
    const userToFollow = await userModels.findById(req.params.user); // vo 
    const loggedInUser = await userModels.findById(req.user.id); // me
    if (!userToFollow) {
      return res.status(403).json({
        success: false,
        message: 'User not found',
      });
    }
    if (userToFollow.followers.includes(req.user.id)) {
      const indexTo = userToFollow.followers.indexOf(req.user.id);
      userToFollow.followers.splice(indexTo, 1);

      const indexMe = loggedInUser.following.indexOf(req.params.user);
      loggedInUser.following.splice(indexMe, 1);
      await userToFollow.save();
      await loggedInUser.save();
      return res.status(200).json({
        success: true,
        message: 'unfollow successfully',
      });

    } else {
      userToFollow.followers.push(req.user.id);
      loggedInUser.following.push(req.params.user);
      await userToFollow.save();
      await loggedInUser.save();
      return res.status(200).json({
        success: true,
        message: 'following successfully',
      });

    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};
