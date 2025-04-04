import express from  "express";
import cors from "cors";
import dotenv from "dotenv"
import morgan from "morgan";

// dot env config will be on top
dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(morgan("common"));
app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
    return  res.status(200).send("jai sri ramm")
})
app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
    
})
