import { Route, Routes } from "react-router-dom";
import LoginAndRegistration from "../pages/user/LoginAndRegistration";
import MainPage from "../pages/user/MainPage";
import HomePage from "../pages/user/HomePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProductPage from "../pages/user/ProductPage";
import AuthorizationPage from "../pages/user/AuthorizationPage";

function UserRouter() {
  return (
    <Routes>
      <Route element={<LoginAndRegistration />}>
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/register"} element={<RegisterForm />} />
      </Route>

      <Route element={<MainPage />}>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/products"} element={<ProductPage />} />
        <Route element={<AuthorizationPage />}>
          <Route path={"/cart"} element={<HomePage />} />
          <Route path={"/profile"} element={<ProductPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default UserRouter;
