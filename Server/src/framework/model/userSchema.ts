
import mongoose, {Schema} from "mongoose";
import IUser from "../../entity/userEntity";


const UserSchema:Schema=new Schema({
    userName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String
    },  
},
{
    timestamps: true 
})


const Users=mongoose.model<IUser>('Users',UserSchema)
export default Users
   
       




  