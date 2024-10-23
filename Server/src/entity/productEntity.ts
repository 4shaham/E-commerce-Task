export default interface IProduct{
    pname: string;
    category: string; // Fixed the spelling from "cateogary" to "category"
    price: number;
    Qty: number; // You may want to consider naming this "quantity" for clarity
    image: string[]; // Array of strings for image URLs
}