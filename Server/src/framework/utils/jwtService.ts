import { error } from "console";
import Jwt, { DecodeOptions, decode } from "jsonwebtoken";
import IJwtService from "../../interface/utils/iJwtService";




export default class JwtService implements IJwtService {

  createToken(data:any): string {
    try {
        
      let secret: string = process.env.JWT_SECRET_key!;
      let token = Jwt.sign(data, secret, { expiresIn: "1h" });
      return token;
    } catch (error) {   
      throw error;
    }
  }


  verify(token: string):any|null{
  
     try {
      
      const decoded=Jwt.verify(token,process.env.JWT_SECRET_key!)  as any

      return decoded

     } catch (error) {  
      
      if (error instanceof Jwt.TokenExpiredError) {

        return null; // Token has expired
    
    } else {
        console.error("JWT Verification Error:", error);
        throw new Error("JWT Verification Error");
    }

    }




  }


}
