import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PSSWD
    }
})

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString()
} 

async function sendOTP(email, otp){
    await transporter.sendMail({
        from: "'RinzList IT' <rinzlist@gmail.com>",
        to: email,
        subject: "OTP Verificaton Code",
        text: `Your code is ${otp}
        `
    })
}