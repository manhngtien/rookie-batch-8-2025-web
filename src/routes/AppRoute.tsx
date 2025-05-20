import Layout from "@/components/layout";
import AssetManagementPage from "@/pages/asset-management/AssetManagementPage";
import LoginPage from "@/pages/auth/LoginPage";
import CreateUserPage from "@/pages/users/CreateUserPage";
import UserManagementPage from "@/pages/users/UserMangementPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <UserManagementPage />,
      },
      {
        path: "create-user",
        element: <CreateUserPage />,
      },
      {
        path: "assets",
        element: <AssetManagementPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
