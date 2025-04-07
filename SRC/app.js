import express from  "express";
import cors from "cors";
import dotenv from "dotenv";
import  cookieParser from "cookie-parser"
import morgan from "morgan";

// dot env config will be on top
dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(morgan("common"));
app.use(express.json())
app.use(cors());
app.use(cookieParser());
//routes
import TestRoute from '../SRC/Routes/TestROutes.js'
import userRoute from "./Routes/user.Route.js"
import loginRoute from "./Routes/user.login.Route.js"
app.use("/api/v1",TestRoute)
//register
app.use("/api/v1/user",userRoute)
//login
app.use("/api/v1/user", loginRoute)
// app.get("/",(req,res)=>{
//     return  res.status(200).send("jai sri ramm")
// })
// app.listen(PORT,()=>{
//     console.log(`server running on port : ${PORT}`);
    
// })

export {app};  