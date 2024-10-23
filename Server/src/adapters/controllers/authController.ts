import { NextFunction, Request, Response } from "express";
import IAuthController from "../../interface/iController/iAuthController";
import IAuthUseCase from "../../interface/iUseCase/iAuthUseCase";
import { StatusCode } from "../../enums/statusCode";
import Errors from "../../errors/error";

export default class AuthController implements IAuthController {
  private authUseCase: IAuthUseCase;

  constructor(authUseCase: IAuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async login(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            console.log("req nody",req.body)
            res.status(StatusCode.success).json(
                "success"
            )
        } catch (error) {
            next(error)
        }

  }

  async register(req: Request, res: Response,next:NextFunction): Promise<void> {
       try {

        const {userName,email,password,confirmPassword}=req.body 
       
        if(!userName ||!email||!password||!confirmPassword){
            throw new Errors("All fields are required",StatusCode.badRequest)
        }  

        await this.authUseCase.registerUserUseCase({userName,email,password,confirmPassword})
        res.status(StatusCode.success).json({message:"successfully created"})    

       }catch (error){
          next(error)
       }  

  }


  async logOut(req: Request, res: Response,next:NextFunction): Promise<void> {
      try {
          


      } catch (error) {
           next(error)
      }
  }




}
