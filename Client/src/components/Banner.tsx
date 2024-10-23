import image from "../assets/Gray Minimalist New Collection Banner.png";

export function BannerImage() {
  return (
    <div className="h-1/2 mt-5 px-8 mx-auto grid place-items-center text-center">
      <img src={image} alt="Banner Image" className="object-cover"></img>
    </div>
  );
}

export default BannerImage;
