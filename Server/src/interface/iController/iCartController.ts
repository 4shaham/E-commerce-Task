import { NextFunction, Response } from "express"
import IRequest from "../other.ts/IRequest"

export default interface ICartController{
    addToCart(req:IRequest,res:Response,next:NextFunction):Promise<void>
    removeCart(req:IRequest,res:Response,next:NextFunction):Promise<void>
    cartQuantityUpdate(req:IRequest,res:Response,next:NextFunction):Promise<void>
    findCart(req:IRequest,res:Response,next:NextFunction):Promise<void>
}