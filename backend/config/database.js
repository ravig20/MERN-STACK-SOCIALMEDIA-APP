const mongoose =  require('mongoose');
// const DB = "mongodb://localhost:27017/SocialMedia";
// mongoose.connect(DB).then(console.log("db connect susscussfully")).catch((err) => console.log(err));
exports.connectDatabase = () =>{
    mongoose
    .connect(process.env.DB_URL)
    .then((con) => console.log(`Database Connected: ${con.connection.host}` ))
    .catch((err) => console.log(`db connection problem ${err}`));

};

      
      
//mongodb://localhost:27017/SocialMedia

