
import express,{ Router } from "express";


const router:Router=express.Router()


import AdminUseCase from "../../useCase/adminUseCase";
import AdminController from "../../adapters/controllers/adminController";
import AdminRepository from "../../adapters/respositorie/adminRepositorie";

// db collection 


// services 




// middleware




const authRepository=new AdminRepository()
const authUseCase=new AdminUseCase()
const authController=new AdminController()






export default router

