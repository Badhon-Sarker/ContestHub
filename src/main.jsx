import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Pages/Root/Root";
import Home from "./Pages/Home/Home";
import Login from "./Components/Authentication/Login/Login";
import AuthProvider from "./Provider/AuthProvider/AuthProvider";
import Register from "./Components/Authentication/Register/Register";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashbord/Dashboard";
import Users from "./Components/Dashbord/Users/Users";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import ManageUser from "./Components/Dashbord/Admin/MangeUser/ManageUser";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: 'manageUsers',
        element: <ManageUser></ManageUser>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
