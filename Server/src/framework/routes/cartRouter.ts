
import express,{ Router } from "express";


const router:Router=express.Router()

import CartController from "../../adapters/controllers/cartController";
import CartRepository from "../../adapters/respositorie/cartRepositorie";
import CartUseCase from "../../useCase/cartUseCase";
// db collection 


// services 




// middleware




const authRepository=new CartRepository()
const authUseCase=new CartUseCase()
const authController=new CartController()






export default router

