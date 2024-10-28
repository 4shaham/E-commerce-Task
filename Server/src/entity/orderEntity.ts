
export interface IOrderItem {
    productId: string;
    quantity: number;
    pName: string;
    price: number;
    orderStatus: string;
}

export interface OrderAddress {
    name: string;
    address: string;    
    phoneNumber: number;
    city: string;
    postalCode: number;
}

export default interface IOrder{
    userId:string;
    orderItems:IOrderItem[];
    paymentMethod: string;
    orderDate: Date;
    address:OrderAddress;
    totalAmount: number;
}