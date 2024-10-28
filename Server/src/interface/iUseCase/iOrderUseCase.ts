export default interface IOrderUseCase{
    createOrder(userId:string,paymentMethod:"online"|"cashOnDeleivery",totalPrice:number,selectedAddressId:string):Promise<void>
}