import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../enums/statusCode";
import JwtService from "../utils/jwtService";
import IRequest from "../../interface/other.ts/IRequest";
import IjwtPayloadData from "../../interface/other.ts/jwtBodyInterface";


const jwt=new JwtService()

const authorizationMiddleware=((req:IRequest,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.token 
        const data:IjwtPayloadData|null=jwt.verify(token)
        req.userId=data.id
        next()
    } catch (error) {
        res.status(StatusCode.UnAuthorized).json({message:"unAuthorized"})
    }
})

export default authorizationMiddleware