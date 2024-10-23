import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware"


// routers
import authRouter from "../routes/authRouter"

// env
dotenv.config()



const app=express()



// this for useing instead of body parser
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit: '10mb'})) 


app.use('/api',authRouter)


// morgan for get all routes console
app.use(morgan('dev'))  



app.use(errorHandlerMiddleware)


export default app


