import { useEffect, useState } from "react";
import {Filter, Grid2X2, Grid3X3} from "lucide-react";
import { Button } from "@material-tailwind/react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../api/user";
import { IProduct } from "../../interface/responseData";

function ProductPage() {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridView, setGridView] = useState("grid-3");
  const [products,setProducts]=useState<IProduct[]>()

  useEffect(()=>{
    const handleAsync=async()=>{
       try {
          const response=await getProducts()
          console.log(response.data)
          setProducts(response.data.products)
       } catch (error) {
          console.log(error)
       }
    }
    handleAsync()
},[])

  // const products = [
  //   {
  //     name: "Oversized Wool Blend Coat",
  //     price: "$199.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "High-Waist Wide Leg Trousers",
  //     price: "$89.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Structured Blazer with Belt",
  //     price: "$129.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Pleated Midi Skirt",
  //     price: "$69.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Knit Sweater with Collar",
  //     price: "$79.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Satin Effect Shirt",
  //     price: "$59.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Cargo Pants with Pockets",
  //     price: "$89.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  //   {
  //     name: "Ribbed Jersey Dress",
  //     price: "$45.90",
  //     images: [
  //       "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
  //       "/api/placeholder/400/500",
  //     ],
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white">

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              className="text-sm font-light"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <h1 className="text-xl font-light">WOMEN / NEW IN</h1>
            <div className="flex items-center gap-2">
              <Button onClick={() => setGridView("grid-2")}>
                <Grid2X2
                  className={`h-5 w-5 ${
                    gridView === "grid-2" ? "text-black" : "text-gray-400"
                  }`}
                />
              </Button>
              <Button onClick={() => setGridView("grid-3")}>
                <Grid3X3
                  className={`h-5 w-5 ${
                    gridView === "grid-3" ? "text-black" : "text-gray-400"
                  }`}
                />
              </Button>
            </div>
          </div>
        </nav>
      </header>

     {/* Filter Data */}
      {isFilterOpen && (
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Color</h3>
                <div className="space-y-1 text-sm">
                  <p className="cursor-pointer hover:underline">Black</p>
                  <p className="cursor-pointer hover:underline">White</p>
                  <p className="cursor-pointer hover:underline">Beige</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Size</h3>
                <div className="space-y-1 text-sm">
                  <p className="cursor-pointer hover:underline">XS</p>
                  <p className="cursor-pointer hover:underline">S</p>
                  <p className="cursor-pointer hover:underline">M</p>
                  <p className="cursor-pointer hover:underline">L</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Price</h3>
                <div className="space-y-1 text-sm">
                  <p className="cursor-pointer hover:underline">Under $50</p>
                  <p className="cursor-pointer hover:underline">$50 - $100</p>
                  <p className="cursor-pointer hover:underline">Over $100</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Collection</h3>
                <div className="space-y-1 text-sm">
                  <p className="cursor-pointer hover:underline">New Arrival</p>
                  <p className="cursor-pointer hover:underline">Basic</p>
                  <p className="cursor-pointer hover:underline">
                    Special Edition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-8">
        <div
          className={`grid ${
            gridView === "grid-2"
              ? "grid-cols-1 sm:grid-cols-2 gap-4"
              : "grid-cols-2 sm:grid-cols-3 gap-4"
          }`}
        >
          {products?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
