import mongoose,{ Schema } from "mongoose";
import IProduct from "../../entity/productEntity";


const ProductSchema:Schema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    cateogary: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Qty:{
        type: Number,
        required: true
    },
    image:[{
        type: String,
        required: true
    }]

});

const Product=mongoose.model<IProduct>('Users',ProductSchema)    
export default Product