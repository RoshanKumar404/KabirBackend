import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true
        },
        mobileNumber: {
            required: true,
            type: String,
            unique: true
        },
        Fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        Address: {
            city: {
                required: true,
                lowercase: true,
                trim: true
            },
            locality: {
                required: true,
                lowercase: true,
                trim: true
            },
            pincode: {
                required: true,
                lowercase: true,
                trim: true
            },

        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }, password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String,
        }

    },

    {
        timestamps: true

    }
    
   
)
userSchema.pre("save",async function(next){
    if(!this.isModified)return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            Fullname:this.Fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        },
    )
}

userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        },
    )
}
 export const user = mongoose.model("user", userSchema);

