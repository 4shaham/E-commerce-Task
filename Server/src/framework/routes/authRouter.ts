
import express,{ Router } from "express";


const router:Router=express.Router()


import AuthUseCase from "../../useCase/authUseCase";
import AuthController from "../../adapters/controllers/authController";
import AuthRepository from "../../adapters/respositorie/authRepository";


// db collection 

import Users from "../model/userSchema";
import Address from "../model/addressSchema";

// services 

import HashingServices from "../utils/hashingService";
import JwtService from "../utils/jwtService";

const hashingService=new HashingServices()
const jwtService=new JwtService()

// middleware
import authorizationMiddleware from "../middleware/authorizarionMiddleware";



const authRepository=new AuthRepository(Users,Address)
const authUseCase=new AuthUseCase(authRepository,hashingService,jwtService)
const authController=new AuthController(authUseCase)



router.post("/login",authController.login.bind(authController))
router.post("/register",authController.register.bind(authController))
router.post("/logout",authController.logOut.bind(authController))
router.get("/tokenVerification",authController.verifyAuth.bind(authController))
router.get("/userData",authorizationMiddleware,authController.userProfileData.bind(authController))
router.post("/addAddress",authorizationMiddleware,authController.addAddress.bind(authController))
router.get('/getAddres',authorizationMiddleware,authController.getAddress.bind(authController))


export default router

  