import IAddress from "../entity/addressEntity";
import IUser from "../entity/userEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import { IAuthRepository } from "../interface/iRepository/iAuthRepository";
import IAuthUseCase from "../interface/iUseCase/iAuthUseCase";
import { LoginBody, LoginResponse, RegisterBodyData } from "../interface/other.ts/IBodyData";
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


 
  async loginUseCase(data: LoginBody): Promise<LoginResponse> {
        try {
            
            // email validation 
       const emailRegex = /\S+@\S+\.\S+/;
       if (!emailRegex.test(data.email)){
            throw new Errors("email format is not valid",StatusCode.forBidden)
       };


            let user=await this.authRepository.emailIsExists(data.email)

            if(!user){
                throw new Errors("Email is not match",StatusCode.notFound)
            }



            if(!await this.hashingService.compare(data.password,user.password) ){
                throw new Errors("Password is not match",StatusCode.UnAuthorized)
            }

            const token=await this.jwtService.createToken({email:user.email,id:user._id})
            return {
                message:"login is sucessfully",
                token:token    
            }

        }catch(error){
             throw error
        }

  }

  async verifyAuthUseCase(token: string): Promise<any> {
      try {
        
       const decodedData=await this.jwtService.verify(token)
       return decodedData     

      } catch (error) {
          throw error
      }
  }

  async getProfileData(userId:string):Promise<IUser|null>{
     try {
      
     return await this.authRepository.getUserData(userId)

     } catch (error) {
       throw error
     }
  }


  async addAdress(userId:string,
    name: string,
    postalCode: string,
    address: string,
    phoneNumber: number,
    city: string):Promise<void>{
      try {

        // the addrss is exceeed 

        if(name.trim()==""||!name ||postalCode.trim()==""||!postalCode||address.trim()==""||!address||city.trim()==""||!city){
           throw new Errors("all filds are required",StatusCode.badRequest)
        }

        let isDb=await this.authRepository.addressDbIsExist(userId)

        if(!isDb){
          await this.authRepository.storeAddress(userId,name,postalCode,address
            ,phoneNumber,city
          )
        }else{
          await this.authRepository.pushAddress(userId,name,postalCode,address,phoneNumber,city)
        }
      } catch (error) {
        throw error
      }
  }


  async getAddressUseCase(userId:string):Promise<IAddress|null>{
    try {
      
      return await this.authRepository.getAddress(userId)

    } catch (error) {
       throw error
    }
  }


}
