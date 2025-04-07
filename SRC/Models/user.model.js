import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
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
// generTION OF THE ACCESS TOKEN
userSchema.methods.genrarateAccessToken= function(){
   return jwt.sign({
    _id:this._id,
    email:this.email,
    PhoneNumber:this.PhoneNumber,
    username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_expires,
    },

)
}

userSchema.methods.genrarateRefreshToken=function(){
 return jwt.sign({
    _id:this._id,
},
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
},
)
}
// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }


export const User = mongoose.model("User", userSchema)