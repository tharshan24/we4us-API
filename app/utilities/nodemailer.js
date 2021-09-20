const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'we4us.app@gmail.com',
        pass: 'we4us@WE4US'
    }
});

function sendEmail (options, callback) {

    const mailOptions = {
        from: 'we4us.app@gmail.com',
        to: options.to,
        subject: options.subject,
        html: options.html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            callback(error)
        } else {
            console.log('Email sent: ' + info.response);
            callback(null,info)
        }
    });
}

// fs.readFile(__dirname + '/../utilities/userVerification.html', 'utf8', function (err,data) {
//     if (err) {
//         console.log(err);
//     }
//     // console.log(data)
//     let result = data.replace(/userId/g, `${34}`);
//     console.log(result)
//     const options = {
//         to: 'tharshan24@gmail.com',
//         subject: 'Verify Email from We4Us',
//         html: result
//     }
//     sendEmail(options, (ex, response) => {
//         if(ex) {
//             console.log({status_code:1,message:'Error in Sending Email',error:ex.message});
//         }
//         else {
//             console.log({status_code:0,message:'Registered successfully. Please verify your email by checking email',result:response});
//         }
//     });
// });

module.exports = {
    sendEmail:sendEmail
}