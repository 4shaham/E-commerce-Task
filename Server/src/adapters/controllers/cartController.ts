import { NextFunction, Response } from "express";
import ICartController from "../../interface/iController/iCartController";
import ICartUseCase from "../../interface/iUseCase/iCartUseCase";
import IRequest from "../../interface/other.ts/IRequest";
import { StatusCode } from "../../enums/statusCode";

export default class CartController implements ICartController {
  private cartUseCase: ICartUseCase;
  constructor(cartUseCase: ICartUseCase) {
    this.cartUseCase = cartUseCase;
  }

  async addToCart(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const productId = req.query.id;
      await this.cartUseCase.addToCart(userId as string,productId as string)
      res.status(StatusCode.success).json({message:"successfully added"})
    } catch (error) {
      next(error);
    }
  }

  async removeCart(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const productId = req.query.id;
      await this.cartUseCase.removeCart(userId as string,productId as string)
    } catch (error) {
      next(error);
    }
  }

  async cartQuantityUpdate(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void>{

    try {
    
      const userId = req.userId;
      const productId=req.query.id
      const qty=req.query.qty

      await this.cartUseCase.updateQuantityCart(userId as string,productId as string,Number(qty))
      res.status(StatusCode.success).json({message:"succsfully updated"})

    } catch (error) {
      next(error);
    }

  }

  async findCart(req:IRequest,res:Response,next:NextFunction):Promise<void>{
    try {
      const userId=req.userId
      const response=await this.cartUseCase.getCart(userId as string)
      res.status(StatusCode
        .success
      ).json({cartData:response})

    } catch (error) {
       next(error)
    }
  }

}
