import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is must"],
        unique: [true, 'this username already taken'],
        lowercase: true,
        trim: true
    },
    name: {

        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "email is must"],
        unique: [true, 'this email already exist'],
        lowercase: true,
        trim: true
    }, PhoneNumber: {
        type: String,
        required: [true, 'Phone number is must'],
        unique: [true, "This Phone Number already exist"]
    },

    profilePIcture: {
        type: String

    },

    password: {
        type: String,
        required: true,
        unique: true
    },
    refreshTOken: {
        type: String,

    },
},
    {
        timestamps: true
    }
);
//using bcrypt to hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13)
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)