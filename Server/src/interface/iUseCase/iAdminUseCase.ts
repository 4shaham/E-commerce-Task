import ICategory from "../../entity/cateogaryEntity"
import IProduct from "../../entity/productEntity"

export default interface IAdminUseCase{
    addCategoryUseCase(categoryName:string,image:string): Promise<void>
    addProductUseCase(pName:string,category:string,description:string,size:string,quantity:number,price:number,image:string[],colour:string):Promise<void>
    getProducts(categoryName:string):Promise<IProduct|null[]>
    getCategoryUseCase():Promise<ICategory|null[]>
    getProduct(id:string):Promise<IProduct|null>

}