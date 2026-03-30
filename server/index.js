import express from "express"
const app = express()
const port = 5050




app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`);
    
})

