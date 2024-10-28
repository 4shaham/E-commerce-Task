export default interface IOrderUseCase{
    createOrder(userId:string,paymentMethod:"online"|"cashOnDeleivery",totalPrice:number):Promise<void>
}