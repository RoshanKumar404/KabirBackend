import {User} from '../Models/user.model.js'
const RegisterController=async(req,res)=>{
    try {
        const {name ,email,password,username, PhoneNumber, }= req.body;
        if(!name||!email||!password||!PhoneNumber||!username){
            return res.status(500).send({
                success:false,
                message:"Please Provide the details"
            })
        }
        const user=await User.create({
            name,email,password,PhoneNumber,username
        })
        res.status(201).send({
            success:true,
            message:"Registration successfull , now you can logIn",
            user,
        })
    } catch (error) {
        console.log("Error in  Rogister API " ,error);
        res.status(500).send({
            success:false,
            message:"Error in Register Api!!! "
        })
        
    }

}
export {RegisterController};

// export const testcontroller=(req,res)=>{
//     res.status(200).send({
//         message:'Test ROutes',
//         success:true,
//     })

// }