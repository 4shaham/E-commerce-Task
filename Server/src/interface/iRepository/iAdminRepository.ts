import ICategory from "../../entity/cateogaryEntity"
import IProduct from "../../entity/productEntity"

export default interface IAdminRepository{
    isExceed(categoryName:string):Promise<ICategory|null>
    saveCateogary(categoryName:string,image:string):Promise<void>   
    storeProuduct(pName:string,category:string,description:string,size:string,quantity:number,price:number,image:string[],colour:string): Promise<void> 
    findCateogary():Promise<ICategory|null[]>
    findProducts(categoaryName:string):Promise<IProduct|null[]>
    findProduct(id:string):Promise<IProduct|null>
}