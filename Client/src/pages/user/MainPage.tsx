
import { Button } from "@material-tailwind/react";
import NavbarWithMegaMenu from "../../components/Navbar";
import FooterWithSitemap from "../../components/Footer";
import { Outlet } from "react-router-dom";

function mainPage(){

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
