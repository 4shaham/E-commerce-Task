import mongoose, { Model } from "mongoose";
import IOrder, { IOrderItem, OrderAddress } from "../../entity/orderEntity";
import ICart from "../../entity/cartEnitity";
import IUser from "../../entity/userEntity";
import IOrderRespository from "../../interface/iRepository/iOrderRepository";
import { CartLookUp } from "../../interface/iRepository/iCartRepository";
import IAddress, { Address } from "../../entity/addressEntity";
import IProduct from "../../entity/productEntity";

export default class OrderRepository implements IOrderRespository {
  private order: Model<IOrder>;
  private cart: Model<ICart>;
  private user: Model<IUser>;
  private product:Model<IProduct>
  private address: Model<IAddress>;
  constructor(
    order: Model<IOrder>,
    cart: Model<ICart>,
    user: Model<IUser>,
    product:Model<IProduct>,
    address: Model<IAddress>
  ) {
    this.order = order;
    this.cart = cart;
    this.user = user;
    this.product=product
    this.address = address;
  }

  async findCart(userId: string): Promise<(CartLookUp | null)[]> {
    try {
      console.log(userId);
      let a = await this.cart.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId) },
        },
        {
          $unwind: "$cartItems",
        },
        {
          $lookup: {
            from: "products", // Ensure this matches the actual collection name in MongoDB
            localField: "cartItems.productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: {
            path: "$productDetails", // Add `$` to specify the field correctly
          },
        },
      ]);

      console.log(a);
      return a;
    } catch (error) {
      throw error;
    }
  }

  async findOrderdAddress(
    userId: string,
    addressId: string
  ): Promise<(any| null)[]> {
    try {
      return await this.address.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$address" },
        { $match: { "address._id": new mongoose.Types.ObjectId(addressId) } },
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }





async storeOrder(userId: string, orderItem:IOrderItem[], paymentMethod: string, address: OrderAddress, totalAmount: number): Promise<void> {
    try {

        let data=new this.order({
            userId:userId,
            orderItems:orderItem,
            paymentMethod:paymentMethod,
            address:address,
            totalAmount:totalAmount
          })
          console.log(data,"order data")
          await data.save()
    } catch (error) {
        console.log(error)
        throw error
    }
}


async setEmptyCart(userId:string):Promise<void>{
  try {
    
    await this.cart.updateOne({userId:userId},{$set:{cartItems:[]}})

  } catch (error) {
    throw error
  }
}


async updateQty(productId:string,qty:number):Promise<void>{
   try {
    
    await this.product.updateOne({_id:productId},{$inc:{quantity:-qty}})  

   } catch (error) {
     throw error
   }
}

} 
