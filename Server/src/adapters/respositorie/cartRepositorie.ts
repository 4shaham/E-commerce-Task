import { Model } from "mongoose";
import ICart from "../../entity/cartEnitity";
import ICartRepository from "../../interface/iRepository/iCartRepository";
import IProduct from "../../entity/productEntity";
import IUser from "../../entity/userEntity";

export default class CartRepository implements ICartRepository {
  private cart:Model<ICart>;
  private Product: Model<IProduct>;

  constructor(cart: Model<ICart>, product: Model<IProduct>) {
    (this.cart = cart), (this.Product = product);
  }

  async addToCartRepository(userId: string, productId: string): Promise<void> {
    try{

      let isExceed = await this.cart.findOne({ userId: userId });

      if (!isExceed) {
        const data = new this.cart({
          userId: userId,
          cartItems:[
            {
              productId: productId,
            },
          ],
        });
        await data.save();

      }

      await this.cart.updateOne(
        { userId: userId },
        { $push: { cartItems: productId } }
      );

    } catch (error) {
      throw error;
    }

  }

  async removeCart(userId:string,productId:string):Promise<void> {
    try{
       
      await this.cart.updateOne({userId:userId},{$pull:{cartItems:{productId:productId}}})
        
    } catch (error) {
      throw error;
    }
  }

  async findCart(userId: string): Promise<ICart| null> {
      try {
        
         let a= await this.cart.aggregate([
            {$match:{userId:userId}},
            {$lookup:{
                "from":"Cart",
                "localField":"productId",
                "foreignField":"_id",
                "as":"ProductDetails"
            }}
        ])
        console.log(a,"aggreagted data")
        return await this.cart.findOne({userId:userId})

      } catch (error) {
        throw error
      }
  } 
 

  async updateQtyCart(userId:string,productId:string,qty:number):Promise<void>{
      try {
         await this.cart.updateOne(
            { userId:userId,"cartItems.productId":productId},
            { $set:{"cartItems.$.quantity": qty } }    
         )
      } catch (error) {
        throw error
      }
  }

 async findProduct(productId:string):Promise<IProduct|null>{
    try {
        
       return await this.Product.findOne({_id:productId})

    } catch (error) {
        throw error
    }
  }

}
