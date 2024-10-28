import { IOrderItem, OrderAddress } from "../entity/orderEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import { CartLookUp } from "../interface/iRepository/iCartRepository";
import IOrderRespository from "../interface/iRepository/iOrderRepository";
import IOrderUseCase from "../interface/iUseCase/iOrderUseCase";

export default class OrderUseCase implements IOrderUseCase {
  private orderRepository: IOrderRespository;
  constructor(orderRepository: IOrderRespository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(
    userId: string,
    paymentMethod: "online" | "cashOnDeleivery",
    totalPrice: number,
    selectedAddressId: string
  ): Promise<void> {
    try {
      // CheckAddressisAvailable
      let cartData: (CartLookUp | null)[] = await this.orderRepository.findCart(
        userId
      );
      if (!cartData.length) {
        throw new Errors("cart is empty", StatusCode.badRequest);
      }

      let orderItems: IOrderItem[] = [];
      for (const product of cartData) {
        const qty = product?.cartItems.quantity;
        const productQty = product?.productDetails.quantity;
        if (qty && productQty && qty < productQty) {
          throw new Errors(`out of stock ${product.productDetails.pName}`,StatusCode.badRequest);
        }
        let val: IOrderItem = {
          productId: product?.cartItems.productId as string,
          quantity: product?.cartItems.quantity as number,
          pName: product?.productDetails.pName as string,
          price: product?.productDetails.price as number,
          orderStatus:"ordered",
        };
        orderItems.push(val);
      }

      let address = await this.orderRepository.findOrderdAddress(
        userId,
        selectedAddressId
      );
    
      if (address == null) {
        throw new Errors("address is not valid", StatusCode.badRequest);
      }
      let orderAddress:OrderAddress={
        name:address[0]?.address.name,
        address:address[0]?.address.address as string,
        phoneNumber:address[0]?.address.phoneNumber as number,
        city:address[0]?.address.city as string,
        postalCode:address[0]?.address.postalCode as number,
      };
     

      await this.orderRepository.storeOrder(
        userId,
        orderItems,
        paymentMethod,
        orderAddress,
        totalPrice
      );  

      // product qty dicrese
      for( const val of cartData){
        await this.orderRepository.updateQty(val?.cartItems.productId as string,val?.cartItems.quantity as number)
      }
      // setCartEmpty after order successs             
      await this.orderRepository.setEmptyCart(userId)  
      

    } catch (error) {
      throw error;
    }
  }
}
