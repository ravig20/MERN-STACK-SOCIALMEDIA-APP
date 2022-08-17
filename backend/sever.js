const app = require("./app")
 const {connectDatabase}= require("./config/database");
const cloudinary = require("cloudinary")
connectDatabase();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET, 
});
PORT = process.env.PORT || 4000; // default Port for production 
app.listen(PORT, function () {
  console.log(`listening on port  ${PORT}`);
});                   