


// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterationFromData } from "../interface/FormData";
import { useForm } from "react-hook-form";
import { userRegister } from "../api/user";
import axios from "axios";
 

 
export function RegisterForm() {
  
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState:{errors},
      } =useForm<RegisterationFromData>();
      const password = watch("password");
      const navigate = useNavigate();

      const handleFormSubmit=async(data:RegisterationFromData)=>{
            try {
                
                await userRegister(data.userName,data.email,data.password,data.confirmPassword)
                navigate("/login")
            } catch (error) {
                if(axios.isAxiosError(error)){
                    if (error.response?.data.message == "The email address is already in use. Please try another one") {
                        setError("email", {
                          type: "server",
                          message: error.response?.data.message,
                        });
                        return;
                      }
                }
            }
      }
  
  
    return (
    <Card
      shadow={false}
      className="md:px-24 md:py-14 py-8 border border-gray-300"
    >
      <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-1 !text-3xl lg:text-4xl"
        >
          User SignUp
        </Typography>
    

      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4 md:mt-12"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>

          <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                 UserName
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin="croosorgin"
            />    

            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Your Email
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              type="email"
        
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
              crossOrigin="croosorgin"
            />
             {errors.email && (
              <Typography color="red" className="text-start">
                {errors.email.message}
              </Typography>
            )}
             <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Password
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              type="password"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {
                required: "This field is required",
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
              
              crossOrigin="croosorgin"

            />
            {errors.password && (
              <Typography color="red" className="text-start">
                {errors.password.message}
              </Typography>
            )}
            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
               Confirm Password
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              type="password"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin="croosorgin"
              {...register("confirmPassword",{
                required: "This field is required",

                onChange: (e) =>
                  setValue("confirmPassword", e.target.value.trim()),
                validate: (value) =>
                  value === password || "Passwords do not match",
                
              })}

            />
             {errors.confirmPassword && (
              <Typography color="red" className="text-start">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </div>
          <Button size="lg" color="gray" type="submit" fullWidth>
            SignUp
          </Button>
         <Link to={"/login"}><Button size="lg" color="gray" fullWidth>
           SignIn
          </Button></Link>
          
          <Typography
            variant="small"
            className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
          >
            Upon signing in, you consent to abide by our{" "}
            <a href="#" className="text-gray-900">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-gray-900">
              Privacy Policy.
            </a>
          </Typography>
        </form>
      </CardBody>
    </Card>
  );
}
 
export default RegisterForm;
