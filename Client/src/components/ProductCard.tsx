
import {Card} from "@material-tailwind/react";
import React, { useState } from 'react';
import {useNavigate } from "react-router-dom";


const ProductCard:React.FC<any>=({image,pName,price,_id}) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate=useNavigate()

    const handleImageClick=(id:string)=>{
         navigate(`/product?id=${id}`)
    }
   
  
    return (
      <Card className="group bg-transparent border-none">
        <div className="relative aspect-[3/4] overflow-hidden">
      <img
            src={image[currentImageIndex]}
            alt={pName}
            className="w-full h-full object-cover transition-opacity duration-300"
            onMouseEnter={() => setCurrentImageIndex(0)}
            onMouseLeave={() => setCurrentImageIndex(0)}
            onClick={()=>handleImageClick(_id)}
          />
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-700 group-hover:underline">{pName}</h3>
          <p className="text-sm font-medium">{price}</p>
        </div>
      </Card>
    );
  };

  export default ProductCard