import { useEffect, useState } from "react"
import { loginStatusChange, logOutStatusChange } from "../../redux/slice/userAuthSlice"
import { useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { tokenVerification } from "../../api/user"

function AuthorizationPage() {

    const [isloading,setIsloading]=useState<Boolean>(true)
  const [userStatus,setUserStatus]=useState<Boolean>(false) 
  const dispatch=useDispatch()

  useEffect(()=>{

      const handleFn=async()=>{
          try {
            
            await tokenVerification()
            setUserStatus(true)
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
    <div>
      {userStatus==true?<Outlet/>:<Navigate to={"/login"}/>}
    </div>
  )
}

export default AuthorizationPage
