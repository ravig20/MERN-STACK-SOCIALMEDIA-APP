const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    caption:String,
    image:{
        public_id:String,
        url:String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users", // MONGOOSE seft independently user id
    },
    created:{
        type: Date,
        default:Date.now(),
    },
    like:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        },
      
    ],
    comments:[
        {
          user:{
              type: mongoose.Schema.Types.ObjectId,
              ref:"Users",
          },
          comment:{
            type: String,
            required: true,
          },

          
        },
      ],
});
module.exports = mongoose.model('Post', postSchema);