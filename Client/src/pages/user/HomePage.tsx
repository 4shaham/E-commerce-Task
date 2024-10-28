import { useEffect, useState } from "react";
import BannerImage from "../../components/Banner";
import { CategoryCard } from "../../components/CategoryCard";
import { Typography } from "@material-tailwind/react";
import { getCategoary } from "../../api/user";
import { ICategoary } from "../../interface/responseData";


const HomePage=()=>{

  const [categoary,setCateogary]=useState<ICategoary[]>()

  useEffect(()=>{
      const handleAsync=async()=>{
         try {
            const response=await getCategoary()
            console.log(response.data)
            setCateogary(response.data.category)
         } catch (error) {
            console.log(error)
         }
      }
      handleAsync()
  },[])



  return (
    <div>
      <BannerImage />
      <div className=" container mb-10 mx-auto">
        <Typography variant="h2" color="blue-gray" className="font-body mt-6 mb-6">
          Available Cateogories
        </Typography>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mt-5">
          {categoary?.map((val) =>(
            <CategoryCard url={val.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
