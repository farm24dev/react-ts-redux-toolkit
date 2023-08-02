import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import RegisterPage from "../pages/auth/register-page";
import routeDashboard from "./dashboard";
import LoginPage from "../pages/auth/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  ...routeDashboard,
]);

export default router;
