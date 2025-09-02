import app from "./app.js";
import dotenv from 'dotenv'
import dbConnect from "./src/db/dbConnect.js";

dotenv.config()
const port = process.env.PORT||3000;;

dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`app is listing on port: ${port}`)
    }) 
})
.catch((err)=>{
    console.log(err)
})