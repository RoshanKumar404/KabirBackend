import mongoose, { Schema } from "mongoose";
const ProductSchema= new Schema({
    productName:{
        required:true,
        type:String,
        lowercase:true,
        trim:true
    },
    ProductDetails:{
        required:true,
        type:String,
        trim:true,
        lowercase:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productImage:{
        type:String,
        required:true
    },
    title:{
        required:true,
        type:String,
        trim:true,
    }
},
{
    timestamps:true
}
)
export const Product=mongoose.model("Product",ProductSchema)