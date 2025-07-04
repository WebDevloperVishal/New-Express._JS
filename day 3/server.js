import express from "express";
import cookieParser from "cookie-parser";

const app = express();

const port = 5000;

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/set-cookies' , (req , res)=>{
    // res.cookie("token" , "my-token" , {maxAge:1000 * 60 * 60 * 24});
    res.cookie("age" , "20" , {signed:true})
    res.send("cookies set")
})


app.get("/get-cookies" , (req , res)=>{
    // console.log(req.cookies.token); // undefined
    console.log(req.signedCookies.age)
    // console.log(req.headers.cookie) // token=my-token
    res.send("cookies get")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});