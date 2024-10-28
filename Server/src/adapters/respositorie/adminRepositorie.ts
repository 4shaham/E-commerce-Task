import mongoose, { Model } from "mongoose";
import ICategory from "../../entity/cateogaryEntity";
import CategoryModel from "../../framework/model/category";
import IAdminRepository from "../../interface/iRepository/iAdminRepository";
import IProduct from "../../entity/productEntity";
import { createEvalAwarePartialHost } from "ts-node/dist/repl";
import { isAwaitExpression } from "typescript";

export default class AdminRepository implements IAdminRepository {
  private category: Model<ICategory>;
  private product: Model<IProduct>;
  constructor(category: Model<ICategory>, product: Model<IProduct>) {
    this.category = category;
    this.product = product;
  }

  async isExceed(categoryName: string): Promise<ICategory | null> {
    try {
      return await this.category.findOne({ categoryName: categoryName });
    } catch (error) {
      throw error;
    }
  }

  async saveCateogary(categoryName: string, image: string): Promise<void> {
    try {
      const data = new this.category({
        categoryName: categoryName,
        image: image,
      });
      await data.save();
    } catch (error) {
      throw error;
    }
  }

  async storeProuduct(pName:string,category:string,description:string,size:string,quantity:number,price:number,image:string[],colour:string): Promise<void> {
    try {
      const product = new this.product({
          pName:pName, 
          category:category, 
          description:description,
          price:price,
          size:size,
          quantity:quantity, 
          image:image,
          colour:colour
      });
      await product.save()
    } catch (error) {
      throw error;
    }
  }

  async findCateogary():Promise<ICategory|null[]>{
     try {
        
       return await this.category.find()

     } catch (error) {
        throw error
     }
  }

  async findProducts(categoaryName:string):Promise<IProduct|null[]>{
    try {
       
      return await this.product.find()

    } catch (error) {
       throw error
    } 
 }

 async findProduct(id:string):Promise<IProduct|null>{ 
    try {
       
      return await this.product.findOne({_id:new mongoose.Types.ObjectId(id)})

    } catch (error) {
       throw error
    }
 }





}
