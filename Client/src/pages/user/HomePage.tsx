import BannerImage from "../../components/Banner";
import { CategoryCard } from "../../components/CategoryCard";
import { Typography } from "@material-tailwind/react";


const HomePage=()=>{

  let array = ["https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563","https://static.zara.net/assets/public/b2af/db1d/f35d457f86f4/849c8e0aff8b/03253852922-p/03253852922-p.jpg?ts=1727769310207&w=563","https://static.zara.net/assets/public/da32/6b0b/8d40405792f4/d250a6f8d169/06224321800-a1/06224321800-a1.jpg?ts=1723039885302&w=563"];

  return (
    <div>
      <BannerImage />
      <div className=" container mb-10 mx-auto">
        <Typography variant="h2" color="blue-gray" className="font-body mt-6 mb-6">
          Available Cateogories
        </Typography>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mt-5">
          {array.map((val) => (
            <CategoryCard url={val} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
