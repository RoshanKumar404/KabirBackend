import mongoose from "mongoose";
const DB_Connection= async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(` \n mongo db connected !! DB Host : ${connection.connection.host}`);
        
    } catch (error) {
        console.log("error while connecting the database : ", error)
    }
};
export default DB_Connection;