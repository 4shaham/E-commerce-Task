import mongoose, {Schema,Model } from "mongoose";
import IOrder from "../../entity/orderEntity";


const OrderSchema:Schema=new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    orderItems: [{
        productId:{
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        pName:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            default:"ordered",
            required: true
        },
    }],
    paymentMethod: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    address:{
        name:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true,
        }
    },
    totalAmount: {
        type: Number
    },
});

const Order=mongoose.model<IOrder>('Users',OrderSchema)
export default Order