import User from '../models/UserModel.js'
import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        return void res.status(401);
    }
}

router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password){
            res.status(401).json({ message: 'Please fill in the credentials' })
        }
        const account_profile = await User.create({ user_profile: { username, email, password } })
        res.status(200).json({ message: 'Account registered successfully!', account_profile })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', async(req, res) => {
    const { identifier, password } = req.body
    const user = await User.findOne({
        $or: [
            { 'user_profile.username' : identifier },
            { 'user_profile.password' : identifier },
        ]
    })

    if (!user || !password === user.user_profile.password){
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    req.session.userId = user._id.toString()
    req.session.save(err => {
        if (err) return res.status(500).json({ message: 'Session save failed' })
        res.json({ message: "Logged in!" })
        console.log(req.session)
    })
})

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid')
        res.json({ message: 'Logged out' })
    })
})

router.get("/get-data", isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.userId).lean()
    res.status(200).json(user);
})

router.post("/send-otp", async(req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await User.findOneAndUpdate(
        { "user_profile.email" : email },
            { $set: { 
                "verification.verif_code" : otp,
                "verification.valid_before" : expires,
            } 
        },
        { new: true }
    );

    await sendOTPEmail(email, otp);
    res.json({ message: 'OTP sent to your email' });
})

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (user && user.verification) {

        if (user.verification.verif_code !== otp || user.verification.valid_before < new Date()){
            res.status(400).json({ message: "Code invalid or expired" })
        }
        else {
            
            user.verification.isVerified = true;
            user.verification.verif_code = undefined;
            user.verification.valid_before = undefined;
            await user.save();

            res.json({ message: 'Email verified successfully' });
        }
    }
    else {
        res.status(500).json({ message: "OTP not set!" })
    }
})

export default router