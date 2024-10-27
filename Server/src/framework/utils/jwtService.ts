import { error } from "console";
import Jwt, { DecodeOptions, decode } from "jsonwebtoken";
import IJwtService from "../../interface/utils/iJwtService";
import IjwtPayloadData from "../../interface/other.ts/jwtBodyInterface";
import Errors from "../../errors/error";



export default class JwtService implements IJwtService {
  createToken(data:IjwtPayloadData):string {
    try {
      let secret:string=process.env.JWT_SECRET_key!;
      let token = Jwt.sign(data, secret, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  verify(token:string):IjwtPayloadData {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET_key!) as any;
      return decoded;
    } catch (error) {
      if (error instanceof Jwt.TokenExpiredError) {
        // return null; // Token has expired
        throw new Error("JWT token expired")
      } else {
        throw new Error("JWT Verification Error");
      }
    }
  }
}
