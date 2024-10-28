import { NextFunction, Request, Response } from "express";
import IRequest from "../other.ts/IRequest";

export default interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  logOut(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
  userProfileData(req:IRequest,res:Response,next:NextFunction):Promise<void>;
  updateProfile(req:IRequest,res:Response,next:NextFunction):Promise<void>;
}
