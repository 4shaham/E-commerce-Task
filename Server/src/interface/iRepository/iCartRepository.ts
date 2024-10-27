import ICart from "../../entity/cartEnitity"
import IProduct from "../../entity/productEntity"


export interface CartResponse{
    
}

export default interface ICartRepository{
    removeCart(userId:string,productId:string):Promise<void>
    addToCartRepository(userId: string, productId: string):Promise<void>
    findCart(userId:string):Promise<ICart|null>
    updateQtyCart(userId:string,productId:string,qty:number):Promise<void>
    findProduct(productId:string):Promise<IProduct|null>
}