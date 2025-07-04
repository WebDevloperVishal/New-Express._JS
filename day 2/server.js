import express from "express"
import userRouter from "./routes/user.routes.js";
const app = express();

app.get("/" , (req , res)=>{
    res.send("hello world")
})

app.use("/api/v1/user",userRouter)


app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})


// global middlewares (req , res , next)✅
// specific routes middlewares
// // inbuilt middlewares
// function SayHello(req , res , next){
//     console.log("hello")
//     next() //read in depth about next
// }

// function logger(req , res , next){
//     console.log(req.method , req.url)

//     next()
// }


// use cases of middleware ---> request ( modify , attach , update)
// 1. logger
// 2. authentication
// 3. authorization
// 4. error handling
// 5. compression
// app.get("/about" ,logger , SayHello ,  (req , res)=>{
//     res.send("about page")
// })

// app.get("/contact" , (req , res)=>{
//     res.send("contact page")
// })

// app.get("get-users" , (req , res)=>{
//     res.send("get users")
// })
// app.get("get-all-users" , (req , res)=>{
//     res.send("get all users")
// }
// )

// ai-models

// messaging

// task