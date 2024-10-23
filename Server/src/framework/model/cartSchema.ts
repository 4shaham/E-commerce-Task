
import ICart from "../../entity/cartEnitity";
import mongoose, { Schema,Model } from 'mongoose';



const CartSchema:Schema=new Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  {
    timestamps: true 
  }
);


const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
