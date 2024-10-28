import { useEffect, useState } from "react";
import { User, MapPin, Package, Heart, Edit2, PlusCircle } from "lucide-react";
import {
  CardBody,
  Card,
  Button,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { IResAddress, IUser } from "../../interface/responseData";
import { addAddress, getAddress, getProfileData } from "../../api/user";
import { useForm } from "react-hook-form";

interface IAddress {
  name: "";
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: number;
}

const UserProfile = () => {

  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];

  const orders = [
    {
      id: "#2364",
      date: "20 Oct 2024",
      status: "Delivered",
      amount: 139.8,
      items: 2,
    },
    {
      id: "#2363",
      date: "15 Oct 2024",
      status: "In Transit",
      amount: 89.9,
      items: 1,
    },
    {
      id: "#2362",
      date: "10 Oct 2024",
      status: "Delivered",
      amount: 159.7,
      items: 3,
    },
  ];

  // const addresses = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     street: "123 Fashion Street",
  //     city: "New York",
  //     state: "NY",
  //     zip: "10001",
  //     phone: "(555) 123-4567",
  //     default: true,
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe",
  //     street: "456 Style Avenue",
  //     city: "Brooklyn",
  //     state: "NY",
  //     zip: "11201",
  //     phone: "(555) 987-6543",
  //     default: false,
  //   },
  // ];

  const payments = [
    {
      id: 1,
      type: "Visa",
      number: "•••• 4242",
      expiry: "12/25",
      default: true,
    },
    {
      id: 2,
      type: "Mastercard",
      number: "•••• 5555",
      expiry: "09/24",
      default: false,
    },
  ];

  const renderTabContent = () => {

    const [userProfileData, setUserProfileData] = useState<IUser>();
    // const [orders,setOrders]=useState()
    const [address,setAddress]=useState<IResAddress[]>()
    const [counter,setCounter]=useState(0)


    useEffect(() => {
      const handleFnasync = async () => {
        try {
          const response = await getProfileData();
          setUserProfileData(response.data.userData);
          const address=await getAddress()
          console.log(address)
          setAddress(address.data.
            addres.address)
        } catch (error) {
          console.log(error);
        }
      };

      handleFnasync();
    }, [counter]);

    // address modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const {
      register,
      handleSubmit,
      setValue,
      // setError,
      // watch,
      formState: { errors },
    } = useForm<IAddress>();

    const handleFormSubmit = async (data: IAddress) => {
      try {
        await addAddress(
          data.name,
          data.postalCode,
          data.address,
          data.phoneNumber,
          data.city
        );
        setCounter(counter+1)
        setOpen(false)
      } catch (error) {
        throw error;
      }
    };

    switch (activeTab) {


      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={40} className="text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">
                  {userProfileData?.userName}
                </h2>
                <p className="text-gray-600">{userProfileData?.email}</p>
              </div>
            </div>

            <Card>
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <button className="text-sm text-gray-600 hover:text-black flex items-center">
                    <Edit2 size={16} className="mr-1" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{userProfileData?.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{userProfileData?.email}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-4">
            {orders?.map((order) => (
              <Card key={order.id}>
                <CardBody className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-4">
                        <h3 className="font-medium">Order {order.id}</h3>
                        <span className="text-sm text-gray-600">
                          {order.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items} {order.items === 1 ? "item" : "items"} • $
                        {order.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100">
                        {order.status}
                      </span>
                      <button className="block text-sm text-gray-600 hover:text-black mt-2">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Saved Addresses</h3>
              <button
                className="flex items-center text-sm text-gray-600 hover:text-black"
                onClick={handleOpen}
              >
                <PlusCircle size={16} className="mr-1" /> Add New Address
              </button>
              <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                  <DialogHeader>
                    {/* <TypeO>Address Information</DialogTitle> */}
                    <h1>Addrss Information</h1>
                  </DialogHeader>

                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit(handleFormSubmit)}
                  >
                    <div>
                      <label htmlFor="name">Full Name</label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="mt-1"
                        crossOrigin={"hd"}
                        {...register("name", {
                          required: "This field is required",
                          onChange: (e) =>
                            setValue("name", e.target.value.trim()),
                        })}
                      />
                      {errors.name && (
                        <Typography color="red" className="text-start text-sm">
                          {errors.name.message}
                        </Typography>
                      )}
                    </div>

                    <div>
                      <label htmlFor="address">Address</label>
                      <Input
                        id="address"
                        {...register("address", {
                          required: "This field is required",
                          onChange: (e) =>
                            setValue("address", e.target.value.trim()),
                        })}
                        placeholder="123 Main St"
                        className="mt-1"
                        crossOrigin={"k"}
                      />
                      {errors.address && (
                        <Typography color="red" className="text-start text-sm">
                          {errors.address.message}
                        </Typography>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city">City</label>
                      <Input
                        id="city"
                        {...register("city", {
                          required: "This field is required",
                          onChange: (e) =>
                            setValue("city", e.target.value.trim()),
                        })}
                        placeholder="New York"
                        className="mt-1"
                        crossOrigin={"sha"}
                      />
                      {errors.city && (
                        <Typography color="red" className="text-start text-sm">
                          {errors.city.message}
                        </Typography>
                      )}
                    </div>

                    <div>
                      <label htmlFor="postalCode">Postal Code</label>
                      <Input
                        id="postalCode"
                        {...register("postalCode", {
                          required: "This field is required",
                          onChange: (e) =>
                            setValue("postalCode", e.target.value.trim()),
                        })}
                        placeholder="10001"
                        className="mt-1"
                        crossOrigin={"j"}
                      />
                      {errors.postalCode && (
                        <Typography color="red" className="text-start">
                          {errors.postalCode.message}
                        </Typography>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Input
                        id="phoneNumber"
                        {...register("phoneNumber", {
                          required: "This field is required",
                          onChange: (e) =>
                            setValue("phoneNumber", e.target.value.trim()),
                        })}
                        placeholder="(123) 456-7890"
                        className="mt-1"
                        crossOrigin={"dd"}
                      />
                      {errors.phoneNumber && (
                        <Typography color="red" className="text-start">
                          {errors.phoneNumber.message}
                        </Typography>
                      )}
                    </div>

                    <DialogFooter>
                      <Button onClick={() => setOpen(false)} className="mr-2">
                        Cancel
                      </Button>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </DialogBody>
              </Dialog>
            </div>

            {address?.map((address,index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{address.name}</h4>
                        {address.defaultAddress && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">
                        {address.name}
                        <br />
                        {address.city}
                        <br />
                        {address.phoneNumber}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <button className="block text-sm text-gray-600 hover:text-black">
                        Edit
                      </button>
                      <button className="block text-sm text-gray-600 hover:text-black">
                        Remove
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        );

      case "payments":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <button className="flex items-center text-sm text-gray-600 hover:text-black">
                <PlusCircle size={16} className="mr-1" /> Add New Card
              </button>
            </div>
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardBody className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">
                          {payment.type} ending in {payment.number}
                        </h4>
                        {payment.default && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">
                        Expires {payment.expiry}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <button className="block text-sm text-gray-600 hover:text-black">
                        Edit
                      </button>
                      <button className="block text-sm text-gray-600 hover:text-black">
                        Remove
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        activeTab === tab.id
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
