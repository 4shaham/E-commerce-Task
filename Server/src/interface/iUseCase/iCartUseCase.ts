import ICart from "../../entity/cartEnitity"
import IProduct from "../../entity/productEntity"

export default interface ICartUseCase{
    addToCart(userId:string,productId:string):Promise<void>
    getCart(userId:string):Promise<ICart|null>
    removeCart(userId:string,productId:string):Promise<void>
    updateQuantityCart(userId:string,productId:string,qty:number):Promise<void>
   
}