const express = require("express");
const { UpdatePassword, forgetPassword, profileUpdate } = require("../controller/curd");
const { deleteMyProfile } = require("../controller/deleteAccount");
const {
  register,
  login,
  followUser,
  logout
} = require("../controller/users");

const { myProfile, userProfileData, users, getUserPost, searchUsers } = require("../controller/usersData");

const { isAuthenticate } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register); 

router.route("/login").post(login);

router.route("/user/logout").get(isAuthenticate, logout); 

router.route("/login/update/password").put(isAuthenticate, UpdatePassword); 

router.route("/login/forget/password").put(forgetPassword);

router.route("/profile/update").put(isAuthenticate, profileUpdate);

router.route("/profile/delete/Profile").delete(isAuthenticate, deleteMyProfile);

router.route("/follow/:user").get(isAuthenticate, followUser); // follow or unFollow both

router.route("/me/profile").get(isAuthenticate, myProfile); 

router.route("/user/profile/:id").get(isAuthenticate, userProfileData); 

router.route("/userPost/:id").get(isAuthenticate, getUserPost);

router.route("/search").get(isAuthenticate, searchUsers);

router.route("/all/users").get(users);

module.exports = router;
