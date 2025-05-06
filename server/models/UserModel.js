import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_profile: {
        username    : { type: String, required: true, unique: true },
        email       : { type: String, required: true, unique: true },
        password    : { type: String, required: true },
    },
    verification: {
        verif_code: String,
        valid_before: Date,
        isVerified: { type: Boolean, default: false }
    },
})

export default mongoose.model('User', UserSchema)