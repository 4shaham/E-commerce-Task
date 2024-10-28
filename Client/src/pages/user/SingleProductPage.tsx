import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { addCart, getProduct } from "../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../../interface/responseData";
import { useSelector } from "react-redux";

const SingleProductPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<IProduct>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string | null = searchParams.get("id");
  const userAuthStatus=useSelector((state:any)=>state.userReducer.userAuthStatus)
  const navigate=useNavigate()

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getProduct(query);
        setProduct(response.data.product);
      } catch (error) {
        throw error;
      }
    };
    handleFn();
  },[]);

  const nextImage = () => {
    if (!product) {
      return null;
    }
    setCurrentImageIndex((prev) =>
      prev === product?.image.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!product) {
      return null;
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.image.length - 1 : prev - 1
    );
  };


  const handleClickCartBag=async()=>{
       try {
        
        if(!userAuthStatus){
            navigate('/login')
            return
        }

      const responsw=await addCart(product?._id as string)
      console.log(responsw)
        navigate('/cart')

       } catch (error) {
          console.log(error)
       }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src={product?.image[currentImageIndex]}
                alt={`Product view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {product?.image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6 my-auto">
            <div>
              <h1 className="text-2xl font-light mb-2">{product?.pName}</h1>
              <p className="text-xl">{product?.price}</p>
            </div>

            <p className="text-gray-600">{product?.description}</p>

            <div>
              <p className="mb-3 text-sm">SELECT SIZE</p>
              <div className="flex flex-wrap gap-2">{product?.size}</div>
            </div>

            {/* Quantity */}
            {/* <div>
              <p className="mb-3 text-sm">QUANTITY</p>
              <div className="flex items-center border border-gray-300 w-32">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-1 bg-black text-white py-4 px-6 hover:bg-gray-800 flex items-center justify-center gap-2"
                onClick={handleClickCartBag}
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO BAG
              </button>
              {/* <button className="p-4 border border-gray-300 hover:border-gray-400">
                <Heart className="w-5 h-5" />
              </button> */}
            </div>

            {/* Product Details */}
            <div className="pt-8 border-t">
              <h2 className="text-sm mb-4">PRODUCT DETAILS</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                {/* {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProductPage;
