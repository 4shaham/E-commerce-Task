
export interface ICartItem {
  productId:string;
  quantity: number;
}

export default interface ICart  {
  userId:string;
  cartItems: ICartItem[];
}
