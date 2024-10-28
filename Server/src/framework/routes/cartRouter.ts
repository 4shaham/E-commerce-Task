
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
import authorizationMiddleware from "../middleware/authorizarionMiddleware";



const cartRepository=new CartRepository(Cart,Product)
const cartUseCase=new CartUseCase(cartRepository)
const cartController=new CartController(cartUseCase)


router.post("/addCart",authorizationMiddleware,cartController.addToCart.bind(cartController))
router.put("/removeCart",authorizationMiddleware,cartController.removeCart.bind(cartController))
router.patch("/updateQuantity",authorizationMiddleware,cartController.cartQuantityUpdate.bind(cartController))
router.get("/getCart",authorizationMiddleware,cartController.findCart.bind(cartController))




  
     

export default router

