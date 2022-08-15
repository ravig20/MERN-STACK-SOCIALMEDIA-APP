const userModels = require("../models/User");
const PostModels = require("../models/Post");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

exports.userProfileData = async function (req, res) {
  try {
    const user_ProfileData = await userModels.findById(req.params.id).populate("post following followers");
    res.status(200).json({
      success: true,
      user_ProfileData,
      message: 'user  profile data',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "  userProfileData  error"
    })
  }
}
// particular user profile data
exports.getPostofFollowingusers = async function (req, res) {
  try {
    const user = await userModels.findOne({ _id: req.user.id })                 // SOMTHING MISTAKE
    const followingUserPosts = await PostModels.find({
      owner: {
        $in: user.following
      }
    }).populate("owner like comments.user");

    res.status(201).json({
      success: true,
      followingUserPosts,
      message: "get post successfully",
      from: "getPostOFusers"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "getPostOFusers"
    });
  }

};

exports.myProfile = async function (req, res) {
  try {
    const profile = await userModels.findById(req.user.id).populate("followers following");
    const posts = [];
    for (let i = 0; i < profile.post.length; i++) {
      const post = await PostModels.findById(profile.post[i]).populate("like owner comments.user");
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      posts,
      profile,
      message: 'your profile',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "  MyProfile error"
    })
  }
}
// show all user data in septate component



exports.getUserPost = async function (req, res) {
  try {
    const profile = await userModels.findById(req.params.id);
    const posts = [];
    for (let i = 0; i < profile.post.length; i++) {
      const post = await PostModels.findById(profile.post[i]).populate("like owner comments.user");
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      posts,
      profile,
      message: 'your profile',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "  MyProfile error"
    })
  }
}

exports.users = async function (req, res) {
  try {
    const user = await userModels.find({});
    res.status(200).json({
      success: true,
      user,
      message: ' all users profile data',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "  users  error"
    })
  }
}

exports.searchUsers = async function (req, res) {
  try {
    const searchUser = await userModels.find({ name: { $regex: req.query.name, $options: "i" } });
    if (searchUser) {
      res.status(200).json({
        success: true,
        searchUser,
        message: "user searched"
      });
    }else{
      res.status(200).json({
        success: false,
        message: "no user exist in this name"
      });
    }
   

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "  searchUsers"
    })

  }
}