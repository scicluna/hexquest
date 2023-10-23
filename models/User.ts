import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    },
    apiKey: String
})

UserSchema.index({ email: 1 });
const User = mongoose.models.User || model("User", UserSchema)
export default User