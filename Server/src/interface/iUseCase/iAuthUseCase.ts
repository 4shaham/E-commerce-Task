import IAddress from "../../entity/addressEntity";
import IUser from "../../entity/userEntity";
import { LoginResponse, RegisterBodyData } from "../other.ts/IBodyData";
import { LoginBody } from "../other.ts/IBodyData";



 

export default interface IAuthUseCase{

    registerUserUseCase(data:RegisterBodyData):Promise<void>
    loginUseCase(data:LoginBody):Promise<LoginResponse>
    verifyAuthUseCase(token:string):Promise<any>
    getProfileData(userId:string):Promise<IUser|null>
    addAdress(userId:string,
        name: string,
        postalCode: string,
        address: string,
        phoneNumber: number,
        city: string):Promise<void>
        getAddressUseCase(userId:string):Promise<IAddress|null>
}