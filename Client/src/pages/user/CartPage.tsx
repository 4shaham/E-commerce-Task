import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Minus, Plus, X, ShoppingBag, Lock } from "lucide-react";

const CartPage = () => {
  const [items, setItems] = React.useState([
    {
      id: 1,
      name: "Oversized Cotton T-Shirt",
      size: "L",
      color: "Black",
      price: 29.99,
      quantity: 1,
      image:
        "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
    },
    {
      id: 2,
      name: "High-Waist Tapered Jeans",
      size: "30",
      color: "Blue",
      price: 89.99,
      quantity: 1,
      image:
        "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
    },
    {
      id: 3,
      name: "Classic Leather Jacket",
      size: "M",
      color: "Brown",
      price: 199.99,
      quantity: 1,
      image:
      "https://static.zara.net/assets/public/7914/e214/02864376aa32/eb332e88508c/01195302701-a1/01195302701-a1.jpg?ts=1719997844582&w=563",
    },
  ]);

  const updateQuantity = (id: any, change: any) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id:string) => {
    setItems(items.filter((item:any)=> item.id != id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
                {items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-4 last:pb-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id as any)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[40px]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
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

                <Button className="w-full mt-6 h-12 text-base gap-2">
                  <Lock className="h-4 w-4" />
                  Checkout
                </Button>

                <div className="mt-6 pt-6 border-t text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{items.length} items in cart</span>
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
