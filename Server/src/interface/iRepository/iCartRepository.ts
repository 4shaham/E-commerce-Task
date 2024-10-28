import ICart from "../../entity/cartEnitity";
import IProduct from "../../entity/productEntity";

export interface CartLookUp extends ICart {
  productDetails:IProduct;
}

export default interface ICartRepository {
  removeCart(userId: string, productId: string): Promise<void>;
  addToCartRepository(userId: string, productId: string): Promise<void>;
  findCart(userId: string): Promise<CartLookUp | null []>;
  updateQtyCart(userId: string, productId: string, qty: number): Promise<void>;
  findProduct(productId: string): Promise<IProduct | null>;
}
