import mongoose, {Schema} from "mongoose";
const userSchema=new Schema({
    username:{
        type :String,
        required:[true,"username is must"],
        unique:[true,'this username already taken'],
        lowercase:true,
        trim:true
    },
    name:{

type:String,
required:true,
    },
    email:{
        type:String,
        required:[true,"email is must"],
        unique:[true,'this email already exist'],
        lowercase:true,
        trim:true
    },
    profilePIcture:{
        type:String

    },
    PhoneNumber:{
        type:Number,
        required:[true, 'Phone number is must'],
        unique:[true,"This Phone Number alrewady exist"]
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    refreshTOken:{
        type:String,

    },
},
{
    timestamps:true
}
)

export  const  User=mongoose.model("User",userSchema)