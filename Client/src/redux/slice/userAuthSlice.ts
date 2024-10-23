import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userAuthStatus:false
 }

export const userAuthSlice=createSlice({
    
    name:"userAuthSlice",
    initialState,

    reducers:{
        loginStatusChange:(state)=>{
           state.userAuthStatus=true
        },
        logOutStatusChange:(state)=>{
          state.userAuthStatus=false
        }
    }

})

export const {loginStatusChange,logOutStatusChange}=userAuthSlice.actions  
export default userAuthSlice.reducer    
