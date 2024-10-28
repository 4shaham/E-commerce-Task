import mongoose, { Model } from "mongoose";
import IOrder from "../../entity/orderEntity";
import ICart from "../../entity/cartEnitity";
import IUser from "../../entity/userEntity";
import IOrderRespository from "../../interface/iRepository/iOrderRepository";
import { CartLookUp } from "../../interface/iRepository/iCartRepository";

export default class OrderRepository implements IOrderRespository{
    
    private order:Model<IOrder>
    private cart:Model<ICart>
    private user:Model<IUser>
    constructor(order:Model<IOrder>,cart:Model<ICart>,user:Model<IUser>){
        this.order=order
        this.cart=cart
        this.user=user
    }


    async findCart(userId: string): Promise<(CartLookUp | null)[]> {
        try {
            
            let a= await this.cart.aggregate([
                {
                    $match: { userId: new mongoose.Types.ObjectId(userId) }
                },
                {
                    $unwind: "$cartItems",
                },
                {
                    $lookup: {
                        from: "products",  // Ensure this matches the actual collection name in MongoDB
                        localField: "cartItems.productId",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$productDetails"  // Add `$` to specify the field correctly
                    }
                }
            ]);
         
            console.log(a)
            return a
                
          
    
    
          } catch (error) {
            throw error  
          }
      }

    
}