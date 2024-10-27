
import express,{ Router } from "express";


const router:Router=express.Router()

import CartController from "../../adapters/controllers/cartController";
import CartRepository from "../../adapters/respositorie/cartRepositorie";
import CartUseCase from "../../useCase/cartUseCase";


// db collection 
import Cart from "../model/cartSchema";  
import Product from "../model/productSchema"; 



//Services 




// middleware




const authRepository=new CartRepository(Cart,Product)
const authUseCase=new CartUseCase()
const authController=new CartController()



  
     

export default router

