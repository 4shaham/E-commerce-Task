import { NextFunction, Request, Response } from "express";
import IAuthController from "../../interface/iController/iAuthController";
import IAuthUseCase from "../../interface/iUseCase/iAuthUseCase";
import { StatusCode } from "../../enums/statusCode";
import Errors from "../../errors/error";
import IRequest from "../../interface/other.ts/IRequest";

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
      res.cookie("token", response.token, {
        maxAge: 3600000,
        secure: true,
      });
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
      console.log(req.body);
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

  async verifyAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(StatusCode.UnAuthorized).json({ message: "token is empty" });
        return;
      }

      const response = await this.authUseCase.verifyAuthUseCase(token);
      res.status(StatusCode.success).json({ decodedData: response });
    } catch (error) {
      next(error);
    }
  }

  async userProfileData(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const userData = await this.authUseCase.getProfileData(userId as string);
      res.status(StatusCode.success).json({ userData: userData });
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
    } catch (error) {
      throw error;
    }
  }

  async addAddress(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const { name, postalCode, address, phoneNumber, city } = req.body;

      await this.authUseCase.addAdress(
        userId as string,
        name,
        postalCode,
        address,
        phoneNumber,
        city
      );
      res.status(StatusCode.success).json({ message: "succesfully created" });
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const addressId = req.body.id;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async getAddress(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;
      const response = await this.authUseCase.getAddressUseCase(
        userId as string
      );
      res.status(StatusCode.success).json({ addres: response });
    } catch (error) {
      next(error);
    }
  }
  
}
