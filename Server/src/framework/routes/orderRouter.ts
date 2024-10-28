

import express,{ Router } from "express";


const router:Router=express.Router()

import OrderController from "../../adapters/controllers/orderController";
import OrderUseCase from "../../useCase/orderUseCase";
import OrderRepository from "../../adapters/respositorie/orderRepositorie";

//db collection 
import Order from "../model/orderSchema";
import Cart from "../model/cartSchema";
import Users from "../model/userSchema";

//Services 




// middleware
import authorizationMiddleware from "../middleware/authorizarionMiddleware";



const orderRepository=new OrderRepository(Order,Cart,Users)
const orderUseCase=new OrderUseCase(orderRepository)
const orderController=new OrderController(orderUseCase)







  
     

export default router

