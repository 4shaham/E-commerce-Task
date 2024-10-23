import { LoginResponse, RegisterBodyData } from "../other.ts/IBodyData";
import { LoginBody } from "../other.ts/IBodyData";



 

export default interface IAuthUseCase{

    registerUserUseCase(data:RegisterBodyData):Promise<void>
    loginUseCase(data:LoginBody):Promise<LoginResponse>
    verifyAuthUseCase(token:string):Promise<any>

}