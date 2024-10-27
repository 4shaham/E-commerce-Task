import ICategory from "../entity/cateogaryEntity";
import IProduct from "../entity/productEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import IAdminRepository from "../interface/iRepository/iAdminRepository";
import IAdminUseCase from "../interface/iUseCase/iAdminUseCase";
import ICloudinaryService from "../interface/utils/iCloudinaryService";

export default class AdminUseCase implements IAdminUseCase {
  private adminRepository: IAdminRepository;
  private cloudinaryService:ICloudinaryService;
  constructor(adminRepository: IAdminRepository,clodinaryService:ICloudinaryService) {
    this.adminRepository = adminRepository;
    this.cloudinaryService=clodinaryService
  }

  async addCategoryUseCase(categoryName:string,image:string): Promise<void> {
    try {

         if(categoryName.trim()==""||image==""){
              throw new Errors("image and categoryName field is requried",StatusCode.badRequest)
         }


        // isExeed checked 
        
        categoryName=categoryName.split("")[0].toUpperCase()+categoryName.split('').slice(1,categoryName.length-1)
        console.log(categoryName,"capitalized name")
        const isExeed=await this.adminRepository.isExceed(categoryName)
 
        if(isExeed){
            throw new Errors("The cateogary name is already used",StatusCode.badRequest)
        }
        
        // store image 
       let imageUrl=await this.cloudinaryService.uploadImage(image)

        // save data 
        await this.adminRepository.saveCateogary(categoryName,imageUrl)

    } catch (error) {
      throw error;
    }
  }


  async addProductUseCase(pName:string,category:string,description:string,size:string,quantity:number,price:number,image:string[],colour:string):Promise<void>{
      try {

        // all fields are requird 
         
        if(pName.trim()!=""||category.trim()==""||description.trim()==""||size.trim()==""||
           quantity==null||price==null||image.length==0||colour.trim()==""
         ){
          throw new Errors("all fields are requried",StatusCode.badRequest)
         }

         //Price Is Greater Than 0 
         if(price>0) throw new Errors("Proudct Price must be greater than 0",StatusCode.badRequest)

         //qty
         if(quantity>0) throw new Errors("Proudct Price must be greater than 0",StatusCode.badRequest) 

        // isCategaory
        let isExceed=await this.adminRepository.isExceed(category)
        if(!isExceed){
            throw new Errors("categaory is not valide",StatusCode.badRequest)
        }

        //Store Multiple Image 
        console.log(image)
        for(let values of image){
            values=await this.cloudinaryService.uploadImage(values)
        }
        console.log(image)

        //Store product 
        
        await this.adminRepository.storeProuduct(pName,category,description,size,quantity,price,image,colour)
        
      } catch (error) {
         throw error
      }
  }


  async getCategoryUseCase():Promise<ICategory|null[]>{
          try {
            
            return await this.adminRepository.findCateogary()

          } catch (error) {
             throw error
          }
  }

  async getProducts(categoryName:string):Promise<IProduct|null[]>{
       try {

        return await this.adminRepository.findProducts(categoryName)
        
       } catch (error) {
          throw error
       }
  }

  async getProduct(id:string):Promise<IProduct|null>{
    try {
      
    return  await this.adminRepository.findProduct(id)

    } catch (error) {
       throw error
    }
  }


}
