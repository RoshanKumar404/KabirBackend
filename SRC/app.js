import express from  "express";
import cors from "cors";
import dotenv from "dotenv"
import morgan from "morgan";
import TestRoute from '../SRC/Routes/TestROutes.js'
// dot env config will be on top
dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(morgan("common"));
app.use(express.json())
app.use(cors());
//routes
app.use("/api/v1",TestRoute)
// app.get("/",(req,res)=>{
//     return  res.status(200).send("jai sri ramm")
// })
// app.listen(PORT,()=>{
//     console.log(`server running on port : ${PORT}`);
    
// })

export {app};  