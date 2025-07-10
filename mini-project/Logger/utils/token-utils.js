import crypto from "crypto";

export const generateToken = () =>{
    return crypto.randomBytes(16).toString("hex")
}

console.log(generateToken);

export const validateToken = (token)=>{
    return token.length === 32;
}