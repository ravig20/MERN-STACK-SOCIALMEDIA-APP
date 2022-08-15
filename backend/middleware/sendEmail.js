// const nodemailer = require("nodemailer");


// exports.sendEmail = async (options) =>{

//     let transporter = nodemailer.createTransport({
//         host: process.env.SMPT_HOST,
//         port: process.env.SMPT_PORT,
//         // secure: false, // true for 465, false for other ports
//         auth: {
//           user: process.env.SMPT_MAIL, // generated ethereal user
//           pass:process.env.SMPT_PASSWORD, // generated ethereal password
//         },
//         service: process.env.SMPT_SERVICE
//     });

//         let mailOptions = {
//             from:process.env.SMPT_MAIL , // sender address
//             to:options.email , // list of receivers
//             subject: options.subject, // Subject line
//             text: options.message, // plain text body
           
//         }
      
// }