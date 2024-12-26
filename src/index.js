import dotenv from"dotenv"
import DB_Connection from "./Database/index.js"

dotenv.config({
    path:'./env'
})
DB_Connection()