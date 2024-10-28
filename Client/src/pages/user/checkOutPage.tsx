

import { useEffect, useState } from 'react';
import { PlusCircle} from 'lucide-react';
import { Card, CardBody } from "@material-tailwind/react"
import { getCart } from '../../api/user';

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [products,setProducts]=useState<any[]>()

  useEffect(()=>{
         const handleAsync=async()=>{
            try {
               const response=await getCart()
               setProducts(response.data.cartData)
            } catch (error) {
              throw error
            }
         }
         handleAsync()
  },[])

  const addresses = [
    {
      id: 0,
      name: 'John Doe',
      street: '123 Fashion Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '(555) 123-4567'
    },
    {
      id: 1,
      name: 'John Doe',
      street: '456 Style Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201',
      phone: '(555) 987-6543'
    }
  ];

  const paymentMethods = [
    {
      id: 0,
      type: 'Visa',
      number: '•••• •••• •••• 4242',
      expiry: '12/25'
    },
    {
      id: 1,
      type: 'Mastercard',
      number: '•••• •••• •••• 5555',
      expiry: '09/24'
    }
  ];

  const subtotal = products?products?.reduce((total,values)=>values.cartItems.quantity*values.productDetails.price+total,0):0
  const shipping = 4.95;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-light mb-8 uppercase tracking-wider">Shopping Bag</h1>
        
        {/* Products */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <h2 className="text-lg font-medium mb-6">Selected Items</h2>
            <div className="space-y-6">
              {products?.map((product) => (
                <div key={product.id} className="flex space-x-4">
                  <img
                    src={product.productDetails.image[0]}
                    alt={product.productDetails.pName}
                    className="w-24 h-32 object-cover bg-gray-100"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.productDetails.pName}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Size: {product.size} | Color: {product.color}
                        </p>
                      </div>
                      <span className="font-medium">${product.productDetails.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Shipping Address */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Shipping Address</h2>
              <button className="flex items-center text-sm text-gray-600 hover:text-black">
                <PlusCircle size={18} className="mr-1" />
                Add New
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`block p-4 border rounded-lg cursor-pointer
                    ${selectedAddress === address.id ? 'border-black' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{address.name}</div>
                      <div className="text-gray-600">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zip}<br />
                        {address.phone}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Payment Method</h2>
              <button className="flex items-center text-sm text-gray-600 hover:text-black">
                <PlusCircle size={18} className="mr-1" />
                Add Card
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((payment) => (
                <label
                  key={payment.id}
                  className={`block p-4 border rounded-lg cursor-pointer
                    ${selectedPayment === payment.id ? 'border-black' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === payment.id}
                      onChange={() => setSelectedPayment(payment.id)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{payment.type}</div>
                      <div className="text-gray-600">
                        {payment.number}
                        <br />
                        Expires {payment.expiry}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Continue Button */}
       <button className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-wider font-medium">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;