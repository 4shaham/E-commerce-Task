import { NextFunction, Response } from "express"
import IRequest from "../other.ts/IRequest"

export default interface IOrderController{
    createOrder(req:IRequest,res:Response,next:NextFunction):Promise<void>
    cancerlOrder(req:IRequest,res:Response,next:NextFunction):Promise<void>   
}