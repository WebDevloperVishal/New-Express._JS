import { Router } from "express";

const userRouter = Router();

userRouter.get("/get-all-user" , (req , res)=>{
    res.send("get all users")
})

userRouter.get("/get-user" , (req , res)=>{
    res.send("get user")
})

userRouter.get("/greet-user" , (req , res)=>{
    res.send("greet user")
})

export default userRouter;