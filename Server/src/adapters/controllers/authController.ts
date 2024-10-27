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
  
  
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Errors("all field is required", StatusCode.forBidden);
      }

      const response = await this.authUseCase.loginUseCase({ email, password });
      res.cookie("token", response.token, { maxAge: 3600000 });
      res.status(StatusCode.success).json(response);
    } catch (error) {
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userName, email, password, confirmPassword } = req.body;

      if (!userName || !email || !password || !confirmPassword) {
        throw new Errors("All fields are required", StatusCode.badRequest);
      }

      await this.authUseCase.registerUserUseCase({
        userName,
        email,
        password,
        confirmPassword,
      });
      res.status(StatusCode.success).json({ message: "successfully created" });
    } catch (error) {
      next(error);
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.cookie("token", "", { maxAge: 3600000 });
      res.status(StatusCode.success).json({ message: "successfully logOut" });
    } catch (error) {
      next(error);
    }
  }


  async verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        
        const token=req.cookies.token 
        if(!token){
          res.status(StatusCode.UnAuthorized).json({message:"token is empty"})
          return
        }

        const response=await this.authUseCase.verifyAuthUseCase(token)
        res.status(StatusCode.success).json({decodedData:response})

      } catch (error) {
          next(error)
      }

  }


}
