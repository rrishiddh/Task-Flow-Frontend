import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/HomePage/Home";
import AuthLayout from "../components/Authentication/AuthLayout";
import LogIn from "../components/Authentication/LogIn";

import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },    
      {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <LogIn></LogIn>,
          },
        ],
      },
    ],
  },
]);

export default router;