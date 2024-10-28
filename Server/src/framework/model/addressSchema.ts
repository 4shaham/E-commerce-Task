// Define the product schema

import mongoose, { Model, Schema } from "mongoose";
import IAddress from "../../entity/addressEntity";


const Addressschema: Schema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  address: [
    {
      name: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      defaultAddress: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  // You can add more fields as needed for your e-commerce project
});

const Address: Model<IAddress> = mongoose.model<IAddress>('Address',Addressschema);
export default Address
