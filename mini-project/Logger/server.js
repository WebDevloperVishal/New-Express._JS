import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import publicRouter from "./routers/public.routes.js";
import privateRouter from "./routers/private.routes.js"
import { logMiddleware } from "./middleware/log.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();

console.log(import.meta);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

if(!fs.existsSync(path.join(__dirname , "logs"))){
    fs.mkdirSync(path.join(__dirname , "logs" ))
}

// Global Middleware
app.use(logMiddleware)

app.use("/api/v1/public" , publicRouter)
app.use("/api/v1/private" , privateRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Logger api🔥');
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});