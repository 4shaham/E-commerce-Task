
export interface ICategoary{
    _id:string,
    categoryName:string;
    image:string;
}

export interface IProduct{
    _id:string;
    pName: string;
    category: string; 
    description:string;
    // sizeAndStock:SizeAndStock[]
    size:"S"|"M"|"L"|"XL";
    quantity:number;
    price:number;
    image: string[]; 
    colour:string;
}

export interface ICartItem {
    productId:string;
    quantity: number;
  }
  
  export default interface ICart  {
    userId:string;
    cartItems:ICartItem;
  }

export interface CartLookUp extends ICart{
    productDetails:IProduct;
}

export interface IUser{
  _id: string;
  email: string;
  userName: string;
  password: string;
}

export interface IResAddress {
  _id:string
  name: string;
  postalCode: number;
  address: string;
  phoneNumber: number;
  city: string;
  defaultAddress: boolean;
}