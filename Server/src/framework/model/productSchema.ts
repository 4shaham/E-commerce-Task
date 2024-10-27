import mongoose, { Schema } from "mongoose";
import IProduct from "../../entity/productEntity";

const ProductSchema: Schema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      requried:true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {  
      type: Number,
      required: true,
      min:0
    },
    size: {
      type: String,
      required: true,   
      enum: ["S", "M", "L", "XL"],
    },
    quantity: {
      type:Number,
      min: 0,
      required: true,
    },
    // sizeAndStock: [{
    //     size: {
    //         type: String,
    //         required: true,
    //         enum: ["S","M","L","XL"]
    //     },
    //     quantity: {
    //         type: Number,
    //         required: true,
    //         min: 0
    //     }
    // }],
    image: [
      {
        type: String,
        required: true,
      },
    ],
    colour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
