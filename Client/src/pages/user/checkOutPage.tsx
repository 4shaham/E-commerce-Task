import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { createOrder, getAddress, getCart } from "../../api/user";
import { IResAddress } from "../../interface/responseData";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<
    "online" | "cashOnDelivery" | ""
  >("");
  const [adderess, setAddress] = useState<IResAddress[]>();
  const [errorMsg, setErrorMsg] = useState("");
  const [products, setProducts] = useState<any[]>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);


  useEffect(() => {
    const handleAsync = async () => {
      try {
        const response = await getCart();
        if (!response.data.cartData.length) {
          navigate("/");
        }
        setLoading(false);
        setProducts(response.data.cartData);
        const address = await getAddress();
        console.log(address);
        setAddress(address.data.addres.address);
      } catch (error) {
        throw error;
      }
    };
    handleAsync();
  }, []);

  if (loading) {
    return <div>..loading</div>;
  }

  const handleSelect = (payment: "online" | "cashOnDelivery") => {
    setSelectedPayment(payment);
  };

  const handleProceedToPayment = async () => {
    try {
      if (!selectedPayment) {
        setErrorMsg("choose any payment Method");
        return;
      }

      if (selectedAddress == "" || !selectedAddress) {
        setErrorMsg("choose any addresss");
        return;
      }

      setButtonLoading(true);

      await createOrder(
        total,
        selectedPayment as "online" | "cashOnDelivery",
        selectedAddress
      );
      setButtonLoading(false);
      navigate('/profile')
    } catch (error) {
      setButtonLoading(false);
    }
  };



  const paymentMethods = ["cashOnDelivery"];

  const subtotal = products
    ? products?.reduce(
        (total, values) =>
          values.cartItems.quantity * values.productDetails.price + total,
        0
      )
    : 0;
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-light mb-8 uppercase tracking-wider">
          Shopping Bag
        </h1>

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
                        <h3 className="font-medium">
                          {product.productDetails.pName}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Size: {product.size} | Color: {product.color}
                        </p>
                      </div>
                      <span className="font-medium">
                        ${product.productDetails.price.toFixed(2)}
                      </span>
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
              {adderess?.map((address, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer
                    ${
                      selectedAddress === address._id
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{address.name}</div>
                      <div className="text-gray-600">
                        {address.address}
                        <br />
                        {address.city}
                        <br />
                        {address.phoneNumber}
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
              {paymentMethods.map((payment: string, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={payment}
                    name="payment"
                    value={payment}
                    checked={selectedPayment === payment}
                    onChange={() =>
                      handleSelect(payment as "online" | "cashOnDelivery")
                    }
                    className="cursor-pointer"
                  />
                  <label htmlFor={payment} className="cursor-pointer">
                    {payment}
                  </label>
                </div>
              ))}

              <p className="mt-4">
                Selected Payment Method:{" "}
                <strong>{selectedPayment || "None"}</strong>
              </p>
            </div>
            <Typography className="text-center text-red-300">
              {errorMsg}
            </Typography>
          </CardBody>
        </Card>

        {/* Continue Button */}

        {buttonLoading ? (
          <button className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-wider font-medium">
            ...loading
          </button>
        ) : (
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-wider font-medium"
          >
            Continue to Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
