import { createBrowserRouter } from "react-router";

import Layout from "@/components/layout";
import { APP_ROUTES } from "@/lib/appRoutes";
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
      // Users
      {
        path: APP_ROUTES.users.path,
        element: <UserManagementPage />,
      },
      {
        path: `${APP_ROUTES.users.path}/${APP_ROUTES.users.create}`,
        element: <CreateUserPage />,
      },
      // Assets
      {
        path: APP_ROUTES.assets.path,
        element: <AssetManagementPage />,
      },
      {
        path: `${APP_ROUTES.assets.path}/${APP_ROUTES.assets.create}`,
        element: <CreateNewAssetPage />,
      },
      // Returns
      {
        path: APP_ROUTES.returns.path,
        element: <RequestPage />,
      },
      // Assignments
      {
        path: APP_ROUTES.assignment.path,
      },
    ],
  },
  {
    path: APP_ROUTES.auth.login,
    element: <LoginPage />,
  },
]);
