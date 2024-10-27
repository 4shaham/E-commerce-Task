import { v2 as cloudinary } from 'cloudinary';
import Errors from "../../errors/error";
import { StatusCode } from "../../enums/statusCode";
import ICloudinaryService from '../../interface/utils/iCloudinaryService';


cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret,
});



export default class CloudinaryService implements ICloudinaryService {
    
    async uploadImage(image: string): Promise<string> {
        try {
            const data = await cloudinary.uploader.upload(image,{
                resource_type: "auto",
              });
             
              return data.url 
            
        } catch (error) {
            console.log(error)
            throw Error()
        }
    }

   async deleteImage(): Promise<void> { 
          
   }

}
