import { Route, Routes } from "react-router-dom";
import LoginAndRegistration from "../pages/user/LoginAndRegistration";
import MainPage from "../pages/user/MainPage";
import HomePage from "../pages/user/HomePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProductPage from "../pages/user/ProductPage";
import AuthorizationPage from "../pages/user/AuthorizationPage";
import CartPage from "../pages/user/CartPage";
import SingleProductPage from "../pages/user/SingleProductPage";
import CheckoutPage from "../pages/user/checkOutPage";
import UserProfile from "../pages/user/ProfilePage";

function UserRouter() {
  return (
    <Routes>

      {/* Login && Registration Routes */}
      <Route element={<LoginAndRegistration/>}>
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/register"} element={<RegisterForm />} />
      </Route>


      <Route element={<MainPage/>}>
        

          {/* Open Routes */}
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/products"} element={<ProductPage/>}/>
          <Route path={"/product"} element={<SingleProductPage/>}/>

          {/* Authorization Routes */}
          <Route element={<AuthorizationPage />}>
            <Route path={"/cart"} element={<CartPage/>} />
            <Route path={"/profile"} element={<UserProfile/>} />
            <Route path={"/checkOut"} element={<CheckoutPage/>} />
            <Route path={"/order"} element={<ProductPage />} />
            <Route path={"/wishList"} element={<ProductPage />} />
          </Route>


      </Route>

    </Routes>

  );

}
export default UserRouter;
