const express = require('express');
const { createPost, likeAndUnlikePost, updateCaption, addComment, deleteComment } = require('../controller/post');
const { deletePost } = require('../controller/post');
const { getPostOFusers, getPostofFollowingusers } = require('../controller/usersData');
const { isAuthenticate } = require('../middleware/auth');
const router = express.Router();

router.route("/post/like/:id").get(isAuthenticate, likeAndUnlikePost);

router.route("/posts").get(isAuthenticate, getPostofFollowingusers ); // done

router.route("/post/comment/:id").put(isAuthenticate, addComment).delete(isAuthenticate, deleteComment);

router.route("/post/upload").post(isAuthenticate, createPost);

router.route("/post/update/caption/:id").put(isAuthenticate, updateCaption);

router.route("/post/:id").delete(isAuthenticate, deletePost);

module.exports = router;
