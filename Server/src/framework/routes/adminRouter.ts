
import express,{ Router } from "express";


const router:Router=express.Router()


import AdminUseCase from "../../useCase/adminUseCase";
import AdminController from "../../adapters/controllers/adminController";
import AdminRepository from "../../adapters/respositorie/adminRepositorie";


// db collection 
import CategoryModel from "../model/category";
import Product from "../model/productSchema";


// services 
import CloudinaryService from "../utils/cloudinaryService";
   
const cloudinaryService=new CloudinaryService()


// middleware

const adminRepository=new AdminRepository(CategoryModel,Product)
const adminUseCase=new AdminUseCase(adminRepository,cloudinaryService)
const adminController=new AdminController(adminUseCase)


router.post("/addCategory",adminController.addCategory.bind(adminController))
router.post("/addProduct",adminController.addProduct.bind(adminController))
router.get("/getCategoary",adminController.getCategory.bind(adminController))
router.get("/getProducts",adminController.getProducts.bind(adminController))
router.get("/getProduct",adminController.getProduct.bind(adminController))


export default router

