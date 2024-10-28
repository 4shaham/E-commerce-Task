import IOrderRespository from "../interface/iRepository/iOrderRepository";
import IOrderUseCase from "../interface/iUseCase/iOrderUseCase";

export default class OrderUseCase implements IOrderUseCase {
  private orderRepository: IOrderRespository;
  constructor(orderRepository: IOrderRespository) {
    this.orderRepository = orderRepository;
  }
}
