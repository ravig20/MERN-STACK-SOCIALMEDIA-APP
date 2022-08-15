const postModels = require("../models/Post");
const UserModels = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {

  try {
    const user = await UserModels.findById(req.user._id);// GET DATA 
    const myCloude =  await cloudinary.v2.uploader.upload(req.body.image,{
      folder:"UserPosts"
    });

    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloude.public_id,
        url:myCloude.secure_url ,
      },
      owner: user._id,

    }
    const Post = await postModels.create(newPostData);


    user.post.unshift(Post._id); // DONE
    await user.save();


    res.status(201).json({
      success: true,
     message: "Image uploaded successfully"
    })


  } catch (err) {
    res.status(500)
      .json({
        message: err.message,
        success: false,
      });
  }

};

exports.deletePost = async function (req, res) {
  try {
    // console.log(req.params.id);
    const post = await postModels.findById(req.params.id);
    const user = await UserModels.findById(req.user._id);
    // console.log(user);
    const index = user.post.indexOf(req.params.id);
    // console.log(index);
    user.post.splice(index, 1);
    await user.save();

    // console.log(post);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }


    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    };
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.remove();
    

    res.status(200).json({
      success: true,
      message: " POST deleted successfully",
    });



  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeAndUnlikePost = async function (req, res) {

  try {
    // console.log("this is a params id",req.params.id);
    const post = await postModels.findById(req.params.id);
    // console.log("user data ",post);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "image not found",
      });

    }
    if (post.like.includes(req.user._id)) {
      const index = post.like.indexOf(req.user._id);
      post.like.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "unlike done",
      });

    } else {
      post.like.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "like done",
      });

    }


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

exports.addComment = async function (req, res) {
  try {
    const post = await postModels.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: " image not not found",
      });
    }
    post.comments.push({
      user: req.user.id,
      comment: req.body.comment,

    });
    await post.save();
    res.status(200).json({
      success: true,
      message: " comment add successfully",
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

exports.deleteComment = async function (req, res) {
  try {
    const post = await postModels.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    if (post.owner.toString() === req.user.id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(401).json({
          success: false,
          message: "provide req.body.commentId ",

        });
      }
      post.comments.forEach((comment, index) => {
        if (comment._id.toString() === req.body.commentId.toString()) {
          post.comments.splice(index, 1);
        }
      })

      await post.save();
      res.status(200).json({
        success: true,
        message: "comment deleted by owner user successfully",
      });

    } else {
      post.comments.forEach((comment, index) => {
        if (comment.user.toString() === req.user.id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "comment deleted by current user successfully",
      });

    }


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: " deleteComment"
    });
  }
}

exports.updateCaption = async function (req, res) {
  try {
    const { caption } = req.body;

    const postData = await postModels.findById(req.params.id);
    if (!postData) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    if (postData.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: "not authorized",
      });
    }
    postData.caption = caption;
    await postData.save();
    res.status(201).json({
      success: true,
      message: "caption update successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }

}