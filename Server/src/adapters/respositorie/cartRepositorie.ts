import { Model } from "mongoose";
import ICart from "../../entity/cartEnitity";
import ICartRepository from "../../interface/iRepository/iCartRepository";
import IProduct from "../../entity/productEntity";

export default class CartRepository implements ICartRepository{

      private cart:Model<ICart>
      private Product:Model<IProduct>

      constructor(cart:Model<ICart>,product:Model<IProduct>){
          this.cart=cart,
          this.Product=product
      }

      
                  




}