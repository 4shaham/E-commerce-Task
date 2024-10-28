import { NextFunction, Response } from "express";
import IOrderController from "../../interface/iController/iOrderController";
import IOrderUseCase from "../../interface/iUseCase/iOrderUseCase";
import IRequest from "../../interface/other.ts/IRequest";
import { StatusCode } from "../../enums/statusCode";



export default class OrderController implements IOrderController {
    private orderUseCase:IOrderUseCase
    constructor(orderUseCase:IOrderUseCase){
        this.orderUseCase=orderUseCase
    }

  
    async createOrder(req:IRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            
            const userId=req.userId
            const {paymentMethod,totalPrice}=req.body 

            await this.orderUseCase.createOrder(userId as string,paymentMethod,totalPrice)
            res.status(StatusCode.success).json({message:"order Successfully"})


        } catch (error) {
             next(error)
        }
    }

    async cancerlOrder(req:IRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            


        } catch (error) {
            next(error)
        }
    }


}