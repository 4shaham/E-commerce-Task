import { RegisterBodyData } from "../other.ts/IBodyData";




 

export default interface IAuthUseCase{

    registerUserUseCase(data:RegisterBodyData):Promise<void>

    

}