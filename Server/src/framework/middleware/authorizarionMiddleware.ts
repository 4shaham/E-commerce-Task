import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../enums/statusCode";
import JwtService from "../utils/jwtService";


const jwt=new JwtService()

const authorizationMiddleware=((req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.token 
        jwt.verify(token)
        next()
    } catch (error) {
        res.status(StatusCode.UnAuthorized).json({message:"unAuthorized"})
    }
})