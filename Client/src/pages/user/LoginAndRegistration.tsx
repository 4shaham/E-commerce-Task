import { Typography } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

function LoginAndRegistration() {
  return (
    <>
      <div className="h-screen flex items-center justify-center ">
        <div className="w-full sm:w-1/2 lg:w-1/2  p-8 shadow-lg rounded-lg">
           <Outlet />
        </div>
      </div>
    </>
  );
}

export default LoginAndRegistration;
