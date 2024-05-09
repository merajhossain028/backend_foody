const nodemailer = require('nodemailer');


async function sendEmail(userEmail, message){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: 'OTP for Foody Account',
        html: ` <h1>Foodly Email Verification</h1>
                <p>Your verification code is:</p>
                <h2 style="color: blue;">${message}</h2>
                <p>Use this code to verify your account</p>
                <p>Thank you for using Foodly</p>`
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;