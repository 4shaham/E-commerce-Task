import IOrderController from "../../interface/iController/iOrderController";
import IOrderUseCase from "../../interface/iUseCase/iOrderUseCase";



export default class OrderController implements IOrderController {
    private orderUseCase:IOrderUseCase
    constructor(orderUseCase:IOrderUseCase){
        this.orderUseCase=orderUseCase
    }

}