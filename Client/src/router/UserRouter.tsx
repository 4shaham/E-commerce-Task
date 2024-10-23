
import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginAndRegistration from '../pages/user/LoginAndRegistration';
import HomePage from '../pages/user/HomePage';


function UserRouter(){

  return (
     <Routes>
          <Route path={"/login"} element={<LoginAndRegistration/>} />
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/register"} element={<LoginAndRegistration/>}/>
     </Routes>
  )

}

export default UserRouter
