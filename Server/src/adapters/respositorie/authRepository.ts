import { Model } from "mongoose";
import { IAuthRepository } from "../../interface/iRepository/iAuthRepository";
import IUser from "../../entity/userEntity";
import { RegisterBodyData } from "../../interface/other.ts/IBodyData";


export default class AuthRepository implements IAuthRepository{

    private users:Model<IUser>;
    constructor(users:Model<IUser>){
        this.users=users 
    }

    async emailIsExists(email: string): Promise<IUser | null> {
        try {
            return await this.users.findOne({email:email})
        } catch (error) {
            throw error
        }
    }

    async saveUserData(data: RegisterBodyData): Promise<void> {
        try {
            
            const user=new this.users(data)
            await user.save()

        } catch (error) {
            throw error
        }
    }

    async getUserData(userId:string):Promise<IUser|null>{ 
        try {
            
            return await this.users.findOne({_id:userId})

        } catch (error) {
            throw error
        }
    }








}