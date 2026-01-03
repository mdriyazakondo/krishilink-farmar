import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import LoadingSpinner from "../pages/Loading/Loading";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Forget from "../auth/Forget";
import AddCrop from "../pages/AddCrop/AddCrop";
import CropAllProdcuts from "../pages/CropAllProdcuts/CropAllProdcuts";
import CropDetails from "../components/CropDetails";
import MyPosts from "../pages/MyPosts/MyPosts";
import MyInterests from "../pages/MyInterests/MyInterests";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateCrop from "../pages/UpdateCrop/UpdateCrop";
import Contact from "../pages/Contact/Contact";

import PriviteRoute from "./PriviteRoute";
import AdminRoute from "./AdminRoute";
import UsersTable from "../pages/AllUserPage/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://krishilink-server-three.vercel.app/latest-products"),
      },
      {
        path: "all-crop",
        element: <CropAllProdcuts />,
      },
      {
        path: "crops/:id",
        element: <CropDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "update/:id",
        element: (
          <PriviteRoute>
            <UpdateCrop />
          </PriviteRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget",
        element: <Forget />,
      },
    ],
  },

  // ================= DASHBOARD (ONLY ADD CROP) =================
  {
    path: "/dashboard",
    element: (
      <PriviteRoute>
        <DashboardLayout />
      </PriviteRoute>
    ),
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "/dashboard/addCrop",
        element: (
          <AdminRoute>
            <AddCrop />,
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-post",
        element: <MyPosts />,
      },
      {
        path: "/dashboard/my-interests",
        element: <MyInterests />,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <UsersTable />
          </AdminRoute>
        ),
      },
    ],
  },
]);
