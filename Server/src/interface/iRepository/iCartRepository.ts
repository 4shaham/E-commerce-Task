import ICart, { ICartItem } from "../../entity/cartEnitity";
import IProduct from "../../entity/productEntity";

interface va {
  userId: string;
  cartItems: ICartItem;
}

export interface CartLookUp extends va {
  productDetails: IProduct;
}

export default interface ICartRepository {
  removeCart(userId: string, productId: string): Promise<void>;
  addToCartRepository(userId: string, productId: string): Promise<void>;
  findCart(userId: string): Promise<CartLookUp | null[]>;
  updateQtyCart(userId: string, productId: string, qty: number): Promise<void>;
  findProduct(productId: string): Promise<IProduct | null>;
}
