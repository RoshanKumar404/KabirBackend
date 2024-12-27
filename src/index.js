import dotenv from"dotenv"
import DB_Connection from "./Database/index.js"
import { app } from "./app.js"

dotenv.config({
    path:'./env'
})
DB_Connection()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port  ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MOngoDb connection failed (src/index.js)" , err);
    
})