
import ICart from "../entity/cartEnitity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import ICartRepository, { CartLookUp } from "../interface/iRepository/iCartRepository";
import ICartUseCase from "../interface/iUseCase/iCartUseCase";

export default class CartUseCase implements ICartUseCase{
   
    private cartRepository:ICartRepository;
    constructor(cartRepository:ICartRepository){
        this.cartRepository=cartRepository
    }

   
    async addToCart(userId:string,productId:string):Promise<void>{
        try {
            
            if(userId?.trim()==""||!userId||!productId||productId?.trim()==""){
                throw new Errors("productId is required",StatusCode.badRequest)
            }

            const product=await this.cartRepository.findProduct(productId)
            if(!product){
               throw new Errors("product id is not valid",StatusCode.badRequest)
            }

            if(product.quantity<0){
                throw new Errors("product is out of stock not able to store",StatusCode.badRequest)
            }

            await this.cartRepository.addToCartRepository(userId,productId)

        } catch (error) {
            throw error
        }
    }

    async removeCart(userId:string,productId:string):Promise<void>{
        try {

            if(userId?.trim()==""||!userId||!productId||productId?.trim()==""){
                throw new Errors("productId is required",StatusCode.badRequest)
            }
            
            await this.cartRepository.removeCart(userId,productId)

        } catch (error) {
            throw error
        }
    }

    async getCart(userId:string):Promise<CartLookUp|null[]>{
        try {
            
           return await this.cartRepository.findCart(userId)

        } catch (error) {
            throw error
        }
    }


    async updateQuantityCart(userId:string,productId:string,qty:number):Promise<void>{
        try {

            const product=await this.cartRepository.findProduct(productId)

            if(!product){
                 throw new Errors("product id is not valide",StatusCode.badRequest)
            }

            if(product.quantity<qty){
              throw  new Errors("product qunatity is not avaialable that much",StatusCode.badRequest)
            }

            if(qty<0){
                throw new Errors("product is not able to update is lesserthan 0",StatusCode.badRequest)    
            }

           // here i need to check stock

            await this.cartRepository.updateQtyCart(userId,productId,qty)
            
        } catch (error) {
            throw error
        }
    }
    

    


}