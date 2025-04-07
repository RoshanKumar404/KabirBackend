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
    const refreshToken=user.genrarateRefreshToken();
    user.refreshToken= refreshToken;
    await user.save()

    const loggedinUser= await User.find(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true,
        maxAge:15*60*1000
       
    }
    res.status(200)
   .cookie("AccessToken", AccessToken, options)
   .cookie("refreshToken", refreshToken, {
    httpOnly:true,
    secure:true,
    maxAge:7*24*60*60*1000

   })
    .json({
        success: true,
        message: "user logged in successfully",
        user: loggedinUser,
        // AccessToken,
        // refreshToken
      });
      
        //.send({
            // status:true,
            // message:"log in successfully",
            //  AccessToken,
            //  refreshToken,
            // user,
           
        //})
    } catch (error) {
        console.log("error in logiing in login controller :" ,error);
        res.status(500).send({
            message:"error in login Api ",
            success:false
        })
        
    }
}