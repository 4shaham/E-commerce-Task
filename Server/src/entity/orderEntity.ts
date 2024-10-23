
export interface IOrderItem {
    productId: string;
    quantity: number;
    pName: string;
    price: number;
    orderStatus: string;
}

export interface IAddress {
    name: string;
    address: string;
    phone: number;
    city: string;
    postalCode: number;
}

export default interface IOrder{
    userId:string;
    orderItems: IOrderItem[];
    paymentMethod: string;
    orderDate: Date;
    address: IAddress;
    totalAmount: number;
}