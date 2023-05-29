import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    img: {
        type: String,
    },
    followers: {
        type: Number,
        default: 0,
    },
    following: {
        type: [String]
    },
    saved: {
        type: [String]
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
    history: {
        type: [String]
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);