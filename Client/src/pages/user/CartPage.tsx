import {useEffect,useState} from "react";
import {Card,CardBody} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Minus, Plus, X, ShoppingBag, Lock } from "lucide-react";
import { getCart, removeCart } from "../../api/user";
import { Link } from "react-router-dom";


const CartPage = () => {


  const [items, setItems] = useState<any[]>();

  useEffect(() => {
    const handleAsync = async () => {
      try {
        const response = await getCart();
        console.log(response.data.cartData);
        setItems(response.data.cartData);
      } catch (error) {
        console.log(error);
      }
    };
    handleAsync();
  }, []);

  const updateQuantity = (id: any,change:any)=>{
     setItems(
      items?.map((item) =>
        item.cartItems._id === id
          ? {
              ...item,
              cartItems:{
                ...item.cartItems,
                quantity:Math.max(1, item.cartItems.quantity+change),
              },
            }
          :item
      )
    );
    
    console.log(items)
  };

  const removeItem = async(id:string)=>{
     try {
      await removeCart(id)
      setItems(items?.filter((item:any)=>item.cartItems.productId !=id ));
     } catch (error) {
       console.log(error)
     }
   
  };

  const subtotal = 1000;
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <Card className="mb-4">
              <CardBody className="divide-y">
                {items?.map((item) => (
                  <div key={item.id} className="py-6 first:pt-4 last:pb-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.productDetails.image[0]}
                          alt={item.productDetails.pName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.productDetails.pName}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item.productDetails.size} | Color:{" "}
                              {item.productDetails.colour}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.cartItems.productId as any)
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.cartItems._id, -1)}
                              className="p-2 hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[40px]">
                              {item.cartItems.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItems._id,1)}
                              className="p-2 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-medium">
                            $
                            {(
                              item.productDetails.price *
                              item.productDetails.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[380px]">
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link to={"/checkOut"}>
                  <Button className="w-full mt-6 h-12 text-base gap-2 ">
                    <Lock className="h-4 w-4" />
                    Checkout
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{items?.length} items in cart</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
