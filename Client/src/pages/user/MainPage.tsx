
import NavbarWithMegaMenu from "../../components/Navbar";
import FooterWithSitemap from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { loginStatusChange, logOutStatusChange } from "../../redux/slice/userAuthSlice";
import { tokenVerification } from "../../api/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function mainPage(){

  const [isloading,setIsloading]=useState<Boolean>(true)
  const dispatch=useDispatch()

  useEffect(()=>{

      const handleFn=async()=>{
          try {
            
            await tokenVerification()
            dispatch(loginStatusChange())

          } catch (error) {

            dispatch(logOutStatusChange())

          }finally{
            setIsloading(false)
          }
      }
      handleFn()

  },[])


  if(isloading){
    return <div>...loading</div>
  }



  return (
    <div className="w-full p-4">
      <NavbarWithMegaMenu/>
       <div className="min-h-screen">
          <Outlet/>
       </div> 
      <FooterWithSitemap/>
    </div>
  )

}

export default mainPage
