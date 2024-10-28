import { CartLookUp } from "./iCartRepository";

export default interface IOrderRespository{
    findCart(userId: string): Promise<(CartLookUp | null)[]> 
}