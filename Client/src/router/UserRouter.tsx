import { Route, Routes } from "react-router-dom";
import LoginAndRegistration from "../pages/user/LoginAndRegistration";
import MainPage from "../pages/user/MainPage";
import HomePage from "../pages/user/HomePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProductPage from "../pages/user/ProductPage";
import AuthorizationPage from "../pages/user/AuthorizationPage";
import CartPage from "../pages/user/CartPage";

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
          <Route path={"/product"} element={<ProductPage/>}/>

          {/* Authorization Routes */}
          <Route element={<AuthorizationPage />}>
            <Route path={"/cart"} element={<CartPage/>} />
            <Route path={"/profile"} element={<ProductPage />} />
            <Route path={"/checkOut"} element={<ProductPage />} />
            <Route path={"/order"} element={<ProductPage />} />
            <Route path={"/wishList"} element={<ProductPage />} />
          </Route>


      </Route>

    </Routes>

  );

}
export default UserRouter;
