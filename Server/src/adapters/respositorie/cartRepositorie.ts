import mongoose, { Model } from "mongoose";
import ICart from "../../entity/cartEnitity";
import ICartRepository, { CartLookUp } from "../../interface/iRepository/iCartRepository";
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


      let isExceed = await this.cart.findOne({userId: userId });
      if (!isExceed) {
        const data = new this.cart({
          userId:userId,
          cartItems:[
            {
              productId: productId,
            },
          ],
        });
        await data.save();
        return
      }

      await this.cart.updateOne(
        { userId: userId },
        { $push:{cartItems:{productId:productId}} }
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

  async findCart(userId: string): Promise<CartLookUp | null []> {
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
