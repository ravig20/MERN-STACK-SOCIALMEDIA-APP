const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// import { env } from 'process';

const userSchema = new mongoose.Schema({
    avatar: {
        public_id: String,
        url: String,
    },
    name: {
        type: String,
        required: [true, "name is required "],
    },
    email: {
        type: String,
        required: [true, "email is required "],
        unique: [true, "email already exist"]
    },
    password: {
        type: String,
        required: [true, "password is required "],
        minLength: [6, "password must be at least 6 characters"],
        select: false,
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }

    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});
// create hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     this.resetPasswordToken = createHmac('sha256',process.env.SECRETFORGOTKET).update(resetToken).digest('hex');
//     this.resetPasswordExpires = Date.now() + 10*60*1000; 
//     return resetToken; 
// };

module.exports = mongoose.model('Users', userSchema);