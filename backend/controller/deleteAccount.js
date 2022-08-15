const userModels = require("../models/User");
const PostModels = require("../models/Post");
const cloudinary = require("cloudinary");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
exports.deleteMyProfile = async function (req, res) {
    try {
        const user = await userModels.findById(req.user.id);

        const posts = user.post;
        const following = user.following;
        const followers = user.followers;

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await user.remove();

        // logout user after removing account
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true,
        };
        res.cookie(`token`, null, options);
      
      
        // deleting existing post in data base
        for (let i = 0; i < posts.length; i++) {
            const post = PostModels.findById(posts[i]);
            await post.remove();
        }

        // remove data to the all the user
        for (let i = 0; i < following.length; i++) {
            const removingFollowingUser = await userModels.findById(following[i]);
            const index = removingFollowingUser.followers.indexOf(req.user.id);
            removingFollowingUser.followers.splice(index, 1);
            await removingFollowingUser.save();
        }
        for (let i = 0; i < followers.length; i++) {
            const removingFollowersUser = await userModels.findById(followers[i]);
            const index = removingFollowersUser.following.indexOf(req.user.id);
            removingFollowersUser.following.splice(index, 1);
            await removingFollowersUser.save();
        }

        const postComment = await PostModels.find({});
        for(let i = 0; i < postComment.length; i++){
            const mycommentPost = await PostModels.findById(postComment[i]._id);
            for(let j = 0; j < mycommentPost.comments.length; j++){
                if(mycommentPost.comments[j].user === req.user.id){
                    mycommentPost.comments.splice(j, 1);
                }
                await mycommentPost.save();
            }

        }
        for(let i = 0; i < postComment.length; i++){
            const mycommentPost = await PostModels.findById(postComment[i]._id);
            for(let j = 0; j < mycommentPost.like.length; j++){
                if(mycommentPost.like[j] === req.user.id){
                    mycommentPost.like.splice(j, 1);
                }
                await mycommentPost.save();
            }

        }
        res.status(200).json({
            success: true,
            message: 'account deleted successfully',
        });

       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            from: " delete MyProfile  error"
        });
        return ;
    }
};