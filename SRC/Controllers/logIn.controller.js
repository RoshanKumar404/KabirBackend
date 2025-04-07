import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt"

export const Login=async(req,res)=>{
    // res.send("log in page")
    try {
        const {identifier,password} =req.body;
        //validating
        if(!identifier|| !password){
            return res.status(500).send({
                success:false,
                message:'Enter Your Credentials'
            })
        }
        //checking user by email AND PHONE NUMBER
        const user=await User.findOne({
            $or:[
                {email:identifier},
                {PhoneNumber:identifier}

            ]
        });
        //const userphone=await User.findOne({PhoneNumber})
        //validating user
        if( !user){
            return res.status(500).send({
                success:false,
                message:"user does not found.."
            })
        }
        
        

        //checking password
        const Passwordmatching=await bcrypt.compare(password,user.password);
        //validation pass
        if(!Passwordmatching){
            return res.status(500).send({
                success:false,
                message:"Credentials did not matched."
            })
        }
    const AccessToken= user.genrarateAccessToken()
    const refreshToken=user.genrarateRefreshToken()
        res.status(200).send({
            status:true,
            message:"log in successfully",
             AccessToken,
             refreshToken,
            user,
           
        })
    } catch (error) {
        console.log("error in logiing in login controller :" ,error);
        res.status(500).send({
            message:"error in login Api ",
            success:false
        })
        
    }
}