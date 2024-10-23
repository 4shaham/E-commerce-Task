import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import { IAuthRepository } from "../interface/iRepository/iAuthRepository";
import IAuthUseCase from "../interface/iUseCase/iAuthUseCase";
import { RegisterBodyData } from "../interface/other.ts/IBodyData";
import IHashingService from "../interface/utils/iHasingService";
import IJwtService from "../interface/utils/iJwtService";

export default class AuthUseCase implements IAuthUseCase {
  private authRepository: IAuthRepository;
  private hashingService: IHashingService;
  private jwtService: IJwtService;

  constructor(
    authRepository: IAuthRepository,
    hashingService: IHashingService,
    jwtService: IJwtService
  ) {
    this.authRepository = authRepository;
    this.hashingService = hashingService;
    this.jwtService = jwtService;
  }

  async registerUserUseCase(data: RegisterBodyData): Promise<void> {
    try {


      // passowrd validataion 


      if(data.password!=data.confirmPassword){
           throw new Errors("password and confirm password is not match",StatusCode.forBidden)
      }


      // email validation 
       const emailRegex = /\S+@\S+\.\S+/;
       if (!emailRegex.test(data.email)){
            throw new Errors("email format is not valid",StatusCode.forBidden)
       };

     
      // email field is unique Here checking email is excedd
      let user = await this.authRepository.emailIsExists(data.email);
      if (user) {
        throw new Errors(
          "The email address is already in use. Please try another one",
          StatusCode.forBidden
        );
      }


      // hashing password 
      let hashedPassword=await this.hashingService.hashing(data.password)
      data.password=hashedPassword

      // save use data
      await this.authRepository.saveUserData(data);

    } catch (error) {  
      throw error;
    }
  }




}
