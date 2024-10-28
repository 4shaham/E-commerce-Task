import IAddress, { Address } from "../../entity/addressEntity";
import { IOrderItem, OrderAddress } from "../../entity/orderEntity";
import { CartLookUp } from "./iCartRepository";

export default interface IOrderRespository{
    findCart(userId: string): Promise<(CartLookUp | null)[]> 
    findOrderdAddress(userId:string,addressId:string):Promise<(any|null)[]>
    storeOrder(userId:string,orderItem:IOrderItem[],paymentMethod:string,address:OrderAddress,totalAmount:number):Promise<void>
    setEmptyCart(userId:string):Promise<void>
    updateQty(productId:string,qty:number):Promise<void>
}