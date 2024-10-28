import { CartLookUp } from "../interface/iRepository/iCartRepository";
import IOrderRespository from "../interface/iRepository/iOrderRepository";
import IOrderUseCase from "../interface/iUseCase/iOrderUseCase";

export default class OrderUseCase implements IOrderUseCase {
  private orderRepository: IOrderRespository;
  constructor(orderRepository: IOrderRespository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(userId:string,paymentMethod:"online"|"cashOnDeleivery",totalPrice:number):Promise<void>{
    
    try {

      // CheckAddressisAvailable
      let cartData:any=await this.orderRepository.findCart(userId)
      if(!cartData.length){
          return
      }
 

      for( const product of cartData.cartItems){
          console.log(product)
      }

      // for (const product of cartData){

      //   const qty = Number(product.quantity);
      //   const products = await Product.findOne(
      //     { _id: product.productId }
      //   )
      //   if (products.instock < qty) {
      //     console.log('hiiii');
      //     return res.status(400).send('out of Stock')
      //     // return res.send("ordered failed No stock")  
      //   }
    
      // }
      // isfindOUtCartProduct 

      //isCheckedQtyisAvailableForProduct 

    
    } catch (error) {
      throw error
    }
  }



}
