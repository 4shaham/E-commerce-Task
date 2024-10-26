
import {Card} from "@material-tailwind/react";
import React, { useState } from 'react';

const ProductCard:React.FC<any>=({images,name,price}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    return (
      <Card className="group bg-transparent border-none">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover transition-opacity duration-300"
            onMouseEnter={() => setCurrentImageIndex(0)}
            onMouseLeave={() => setCurrentImageIndex(0)}
          />
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-700 group-hover:underline">{name}</h3>
          <p className="text-sm font-medium">{price}</p>
        </div>
      </Card>
    );
  };

  export default ProductCard