import IAddress from "../../entity/addressEntity";
import IUser from "../../entity/userEntity";
import { RegisterBodyData } from "../other.ts/IBodyData";

export interface IAuthRepository {
  emailIsExists(email: string): Promise<IUser | null>;
  saveUserData(data: RegisterBodyData): Promise<void>;
  getUserData(userId: string): Promise<IUser | null>;
  addressDbIsExist(userId:string):Promise<IAddress|null>
  pushAddress(
    userId: string,
    name: string,
    postalCode: string,
    address: string,
    phoneNumber: number,
    city: string
  ): Promise<void>;
  storeAddress(
    userId: string,
    name: string,
    postalCode: string,
    address: string,
    phoneNumber: number,
    city: string
  ):Promise<void> 
  getAddress(userId:string):Promise<IAddress|null>



}
