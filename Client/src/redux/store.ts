
import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";



const store=configureStore({
   reducer:{
     userReducer:userAuthSlice
   }
})

export default store