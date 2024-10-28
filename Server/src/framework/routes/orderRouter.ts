

import express,{ Router } from "express";


const router:Router=express.Router()

import OrderController from "../../adapters/controllers/orderController";
import OrderUseCase from "../../useCase/orderUseCase";
import OrderRepository from "../../adapters/respositorie/orderRepositorie";

//db collection 
import Order from "../model/orderSchema";
import Cart from "../model/cartSchema";
import Users from "../model/userSchema";
import Address from "../model/addressSchema";
//Services 




// middleware
import authorizationMiddleware from "../middleware/authorizarionMiddleware";
import Product from "../model/productSchema";




const orderRepository=new OrderRepository(Order,Cart,Users,Product,Address)
const orderUseCase=new OrderUseCase(orderRepository)
const orderController=new OrderController(orderUseCase)



router.post("/saveOrder",authorizationMiddleware,orderController.createOrder.bind(orderController))



  
     

export default router

