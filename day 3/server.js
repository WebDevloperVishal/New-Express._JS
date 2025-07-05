import express from 'express'
const app = express()
import cookieParser, { signedCookie } from "cookie-parser"
const port = 8080

app.use(express.json())
app.use(cookieParser("377abd5f7e10ed9f69c5ba81fab180208e524bd5dd183628532e67cb661b336f"))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/set-cookies', (req, res) => {
    // res.cookie('token', 'my-token', { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("theme", "dark",  {signed:true})
    res.cookie("age", "21",  {signed:true})
    console.log(req.cookies);
    
    res.send('cookie set')
    // res.status(500).send(error.message)
})

app.get('/get-cookies', (req, res) => {
    // res.cookie('token' , 'my-token'); 
    // console.log(req.cookies.token);
    console.log(req.signedCookies.age);
    console.log(req.signedCookies.theme);

    res.send('cookie get')

    // res.status(500).send(error.message)
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({ success: true })
})

app.listen(port, () => console.log(`Server is runniing on port http://localhost:8080`))