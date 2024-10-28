import { Model } from "mongoose";
import { IAuthRepository } from "../../interface/iRepository/iAuthRepository";
import IUser from "../../entity/userEntity";
import { RegisterBodyData } from "../../interface/other.ts/IBodyData";
import IAddress from "../../entity/addressEntity";

export default class AuthRepository implements IAuthRepository {
  private users: Model<IUser>;
  private address: Model<IAddress>;
  constructor(users: Model<IUser>, address: Model<IAddress>) {
    this.users = users;
    this.address = address;
  }

  async emailIsExists(email: string): Promise<IUser | null> {
    try {
      return await this.users.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  async saveUserData(data: RegisterBodyData): Promise<void> {
    try {
      const user = new this.users(data);
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async getUserData(userId: string): Promise<IUser | null> {
    try {
      return await this.users.findOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  }

  async storeAddress(
    userId: string,
    name: string,
    postalCode: string,
    address: string,
    phoneNumber: number,
    city: string
  ):Promise<void> {
    try {
      const data = new this.address({
        userId: userId,
        address: [
          {
            name: name,
            postalCode: postalCode,
            address: address,
            phoneNumber: phoneNumber,
            city: city,
            defaultAddress: true,
          },
        ],
      });

      await data.save();
    } catch (error) {
      throw error;
    }
  }

  async addressDbIsExist(userId:string):Promise<IAddress|null>{
    try {
        return await this.address.findOne({userId:userId})
    } catch (error) {
         throw error
    }
  }

  async pushAddress(
    userId: string,
    name: string,
    postalCode: string,
    address: string,
    phoneNumber: number,
    city: string
  ): Promise<void> {
    try {
      let data = {
        name: name,
        postalCode: postalCode,
        address: address,
        phoneNumber: phoneNumber,
        city: city,
      };

      await this.address.updateOne(
        { userId: userId },
        { $push: { address: data } }
      );
    } catch (error) {
      throw error;
    }
  }

  
 async getAddress(userId:string):Promise<IAddress|null>{
    try {
      
      return await this.address.findOne({userId:userId})

    } catch (error) {
       throw error
    }
}
}
