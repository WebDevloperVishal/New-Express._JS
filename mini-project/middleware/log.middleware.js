import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (!fs.existsSync(path.join(__dirname, "logs"))) {
//     fs.mkdirSync(path.join(__dirname, "logs"))
// }

export const logMiddleware = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    const logFile = path.join(__dirname, "../logs/request.log")
    
    fs.appendFile(logFile, log, (err) => {
        if(err) console.error('Failed to log request', err);
    })
    next();
}