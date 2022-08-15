const userModels = require("../models/User");
const PostModels = require("../models/Post");
const cloudinary = require("cloudinary");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.UpdatePassword = async function (req, res) {
  try {
   
    const { oldPasswords, newPasswords, confirmPassword } = req.body;
    if (!oldPasswords && !newPasswords && !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "please provide a field ",
        from: "forgetPassword",
      });
    }

    const user = await userModels.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "account is not exists please create your account",
        from: "forgetPassword",
      });
    }
    let isPassword = await bcrypt.compare(oldPasswords, user.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "OldPasswords do not match",
      });
    }
    if (newPasswords !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: " newPasswords or confirmPassword same",
      });
    }
    user.password = newPasswords;
    await user.save();
    res.status(200).json({
      success: true,
      message: "your password has been updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "updated password",
    });
  }
};

exports.forgetPassword = async function (req, res) {
  try {
    const {email, newPasswords, confirmPassword} = req.body;
    const user = await userModels.findOne({email}).select("+password");
  
    if(!user){
      return res.status(404).json({
          success: false,
          message: "no email address exists",
      });
    }
    if(newPasswords.toString() !== confirmPassword.toString()){
      return res.status(400).json({
        success: false,
        message: "newPasswords confirmPassword dose not match",
    });
    }
    user.password = newPasswords;
    await user.save();
    res.status(200).json({
      success: true,
      message:"password updated successfully"
    });
    
  //   const user = await userModels.findOne({ email: req.body.email });
  //   if (!user) {
  //     return res.status(401).json({
  //       success: false,
  //       message: "account is not exists please create new account first",
  //       from: "forgetPassword",
  //     });
  //   }
  //   const resetPasswordToken = userModels.getResetPasswordToken();
  //   await user.save();

  //   const resetUrl = `${req.protocol}://${req.get(
  //     "host"
  //   )}/api/v1/password/reset/${resetPasswordToken}`;

  //   const message = `reset your password on  click this link : \n \n  ${resetUrl}`;

  //   try {
  //     await  ({
  //       email: user.email,
  //       subject: "reset your password",
  //       message,
  //     });
  //     res.status(200).json({
  //       success: true,
  //       message: `email send successfully to ${user.email}`,
  //     });
  //   } catch (error) {
  //     user.resetPasswordToken = undefined;
  //     user.resetPasswordExpires = undefined;
  //     await user.save();
  //     res.status(500).json({
  //       success: false,
  //       message: `email send failed to ${user.email}`,
  //       error: error.message,
  //     });
  //   }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      from: " forget Password error",
    });
  }
};

exports.profileUpdate = async function (req, res) {
  try {
    const { email, name, avatar } = req.body;
    // if (!email || !name || !avatar) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "please provide a field ",
    //     from: "profileUpdate",
    //   });
    // }
    const user = await userModels.findById(req.user.id);
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if(avatar){
      
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const myCloude =  await cloudinary.v2.uploader.upload(avatar,{
        folder:"Avatar",      
      });
      user.avatar.public_id = myCloude.public_id;
       
      user.avatar.url = myCloude.secure_url ;
  
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: " profile Update error",
    });
  }
};
