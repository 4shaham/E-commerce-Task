import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser";


import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware"


// env
dotenv.config()

// routers
import authRouter from "../routes/authRouter"
import adminRouter from "../routes/adminRouter"
import cartRouter from "../routes/cartRouter"




const app=express()



// this for useing instead of body parser
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit: '10mb'})) 


//  set up cookieParser
app.use(cookieParser());



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// morgan for get all routes console
app.use(morgan('dev'))  


app.use('/api',authRouter)
app.use('/api',cartRouter)
app.use('/api/admin',adminRouter)



app.use(errorHandlerMiddleware)


export default app


