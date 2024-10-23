

import React from "react";
 
// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 

 
export function RegisterForm() {
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
              name="email"
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
              crossOrigin="croosorgin"

            />
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

            />
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
