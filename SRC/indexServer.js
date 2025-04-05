import dotenv from 'dotenv';
import DB_Connection from './Configs/DBconnection.js';
import { app } from './app.js';
dotenv.config({
    path:'./env'
});

DB_Connection().then(()=>{
    app.listen(process.env.PORT ||3000,()=>{
        console.log("server is running on the port : ", process.env.PORT);
        
    })
})
.catch((err)=>{
    console.log("mongo connection failed");
    
})