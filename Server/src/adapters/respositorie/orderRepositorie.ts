import { Model } from "mongoose";
import IOrderInterface from "../../interface/iRepository/iOrderRepository";
import IOrder from "../../entity/orderEntity";
import ICart from "../../entity/cartEnitity";
import IUser from "../../entity/userEntity";

export default class OrderRepository implements IOrderInterface{
    
    private order:Model<IOrder>
    private cart:Model<ICart>
    private user:Model<IUser>
    constructor(order:Model<IOrder>,cart:Model<ICart>,user:Model<IUser>){
        this.order=order
        this.cart=cart
        this.user=user
    }


    
}