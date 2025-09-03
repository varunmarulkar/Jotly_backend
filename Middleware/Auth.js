// Middleware to verify jwt token and protect routes

import UserModel from "../Models/User.model.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/gmailConfig.js"

export async function VerifyToken(req,res,next){
    try {
        const authorization=req.headers.authorization 
       
       // Check if Auhorization header is present and has JWT token 
       if(!authorization || !req.headers.authorization.startsWith("JWT")){
        return res.status(401).json({message:"Invalid"})
       }
    
       // Extract token from header 
       const token= authorization.split(" ")[1]
     
       // Verify the token  
       const verified=jwt.verify(token,JWT_SECRET)
       

       // find the token by the
       const user=await UserModel.findById(verified.id)

       if(!user){
        return res.status(404).json({message:"User is not found"})
       }

       // Attach user to request for further use
       req.user=user
       next();
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}