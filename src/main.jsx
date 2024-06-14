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

// import Users from "./Components/Dashbord/Users/Users";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ManageUser from "./Components/Dashbord/Admin/MangeUser/ManageUser";
import Dashboard from "./Components/Dashbord/Dashboard";
import PerticipatedContest from "./Components/Dashbord/Users/PerticipatedContest/PerticipatedContest";
import AddContest from "./Components/Dashbord/Creator/AddContest/AddContest";
import MyCreatedContest from "./Components/Dashbord/Creator/MyCreatedContest/MyCreatedContest";
import ContestSubmittedPage from "./Components/Dashbord/Creator/ContestSubmittedPage/ContestSubmittedPage";
import AllContest from "./Pages/AllContest/AllContest";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import ContestDetailspage from "./Pages/AllContest/ContestDetailsPage/ContestDetailspage";
import Payment from "./Pages/AllContest/ContestDetailsPage/Payment/Payment";
import MyProfile from "./Components/Dashbord/Users/MyProfile/MyProfile";
import MyWinningContest from "./Components/Dashbord/Users/MyWinningContest/MyWinningContest";
import EditMyCreated from "./Components/Dashbord/Creator/MyCreatedContest/EditMyCreated/EditMyCreated";
import SubmittedRoute from "./Components/Dashbord/Creator/ContestSubmittedPage/SubmittedRoute/SubmittedRoute";



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
      {
        path: '/allContest',
        element: <AllContest></AllContest>
      },
      {
        path: '/contestDetails/:id',
        element: <PrivateRoutes><ContestDetailspage></ContestDetailspage></PrivateRoutes>
      },
      {
        path: '/payment/:id',
        element: <Payment></Payment>
      }
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
     
      {
        path: 'manageUsers',
        element: <ManageUser></ManageUser>
      },
      {
        path: 'perticipatedContest',
        element: <PerticipatedContest></PerticipatedContest>
      },
      {
        path: 'addContest',
        element: <AddContest></AddContest>
      },
      {
        path: 'myCreatedContest',
        element: <MyCreatedContest></MyCreatedContest>
      },
      {
        path: 'contestSubmitted',
        element: <ContestSubmittedPage></ContestSubmittedPage>
      },
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'myWinning',
        element: <MyWinningContest></MyWinningContest>
      },
      {
        path: '/dashboard/myCreatedContest/editContest/:id',
        element: <EditMyCreated></EditMyCreated>
      },
      {
        path: '/dashboard/contestSubmitted/submitted/:name',
        element: <SubmittedRoute></SubmittedRoute>
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
