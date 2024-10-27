import mongoose, { Schema, Model, Document } from 'mongoose';
import ICategory from '../../entity/cateogaryEntity';


const categorySchema: Schema<ICategory> =new Schema(
  {
    categoryName:{
      type: String,
      unique: true,
      required: true
    },
    image:{
      type: String,
      required: true
    }
  },
  {     
    timestamps: true
  }  
);

const CategoryModel: Model<ICategory>=mongoose.model<ICategory>('Category',categorySchema);
export default CategoryModel;
