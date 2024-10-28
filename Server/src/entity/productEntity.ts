

export interface SizeAndStock{
    size:"S"|"M"|"L"|"XL",
    quantity:number
}

export default interface IProduct{
    _id:string;
    pName: string;
    category: string; 
    description:string;
    // sizeAndStock:SizeAndStock[]
    size:"S"|"M"|"L"|"XL";   
    quantity:number;
    price:number;
    image: string[];     
    colour:string;  
}                 