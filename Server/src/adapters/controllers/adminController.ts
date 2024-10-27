import { NextFunction, Request, Response } from "express";
import IAdminController from "../../interface/iController/iAdminController";
import IAdminUseCase from "../../interface/iUseCase/iAdminUseCase";
import { StatusCode } from "../../enums/statusCode";
import { createEvalAwarePartialHost } from "ts-node/dist/repl";

export default class AdminController implements IAdminController{
  private adminUseCase: IAdminUseCase;
  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  
  async addCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { categoryName, image } = req.body;
      await this.adminUseCase.addCategoryUseCase(categoryName, image);
      res.status(StatusCode.success).json({ message: "cateogary is saved" });
    } catch (error) {
      next(error);
    }
  }

  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const {pName,category,description,size,quantity,price,image,colour}=req.body
      await this.adminUseCase.addProductUseCase(pName,category,description,size,quantity,price,image,colour)
      res.status(StatusCode.success).json({message:"created successfully"})

    } catch (error) {
      next(error);
    }
  }

 async getCategory(req:Request,res:Response,next:NextFunction):Promise<void>{
     try {

        const response=await this.adminUseCase.getCategoryUseCase()
        res.status(StatusCode.success).json({category:response})
      
     } catch (error) {
        next(error)
     }
  }

  async getProducts(req:Request,res:Response,next:NextFunction):Promise<void>{
      try {
        
        const category:string=req.query.category as string
        const response=await this.adminUseCase.getProducts(category)
        res.status(StatusCode.success).json({products:response})

      } catch (error) {
        throw error
      }
  }

  async getProduct(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      
     
      const id:string=req.query.id as string
      const response=await this.adminUseCase.getProduct(id)
      res.status(StatusCode.success).json({product:response})

    } catch (error) {
      next(error)
    }
  }
}



