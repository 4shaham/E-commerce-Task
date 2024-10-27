import { NextFunction, Request, Response } from "express";

export default interface IAdminController{
     addCategory(req:Request,res:Response,next:NextFunction):Promise<void> 
     addProduct(req:Request,res:Response,next:NextFunction):Promise<void>  
     getProduct(req:Request,res:Response,next:NextFunction):Promise<void>
     getCategory(req:Request,res:Response,next:NextFunction):Promise<void>
}       