const app = require("./app")
require("./config/database");
const cloudinary = require("cloudinary")

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET, 
});
PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`listening on port  ${process.env.PORT}`);
});                   