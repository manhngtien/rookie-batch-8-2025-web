import { createBrowserRouter } from "react-router";

import Layout from "@/components/layout";
import AssetManagementPage from "@/pages/asset-management/AssetManagementPage";
import CreateNewAssetPage from "@/pages/asset-management/CreateNewAssetPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFound from "@/pages/NotFound";
import RequestPage from "@/pages/requests/RequestPage";
import CreateUserPage from "@/pages/users/CreateUserPage";
import UserManagementPage from "@/pages/users/UserMangementPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "users",
        element: <UserManagementPage />,
      },
      {
        path: "users/create-user",
        element: <CreateUserPage />,
      },
      {
        path: "assets",
        element: <AssetManagementPage />,
      },
      {
        path: "assets/create-asset",
        element: <CreateNewAssetPage />,
      },
      {
        path: "returns",
        element: <RequestPage />,
      },
      {
        path: "returns",
        element: <RequestPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
