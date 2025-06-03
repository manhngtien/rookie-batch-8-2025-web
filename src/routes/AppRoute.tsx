import { createBrowserRouter } from "react-router";

import Layout from "@/components/layout";
import { APP_ROUTES } from "@/lib/appRoutes";
import AssetManagementPage from "@/pages/asset-management/AssetManagementPage";
import CreateNewAssetPage from "@/pages/asset-management/CreateNewAssetPage";
import EditAssetPage from "@/pages/asset-management/EditAssetPage";
import AssignmentManagementPage from "@/pages/assignments/AssignmentManagementPage";
import CreateAssignmentPage from "@/pages/assignments/CreateAssignmentPage";
import OwnAssignmentPage from "@/pages/assignments/OwnAssigmentPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFound from "@/pages/NotFound";
import RequestPage from "@/pages/requests/RequestPage";
import CreateUserPage from "@/pages/users/CreateUserPage";
import EditUserPage from "@/pages/users/EditUserPage";
import UserManagementPage from "@/pages/users/UserMangementPage";

import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <OwnAssignmentPage />,
          },
          // Users
          {
            path: APP_ROUTES.users.path,
            element: <UserManagementPage />,
          },
          {
            path: `${APP_ROUTES.users.path}/${APP_ROUTES.users.create}`,
            element: <CreateUserPage />,
          },
          {
            path: `${APP_ROUTES.users.path}/${APP_ROUTES.users.edit}/:staffCode`,
            element: <EditUserPage />,
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
          {
            path: "/assets/edit-asset/:assetCode",
            element: <EditAssetPage />,
          },
          // Returns
          {
            path: APP_ROUTES.returns.path,
            element: <RequestPage />,
          },
          // Assignments
          {
            path: APP_ROUTES.assignment.path,
            element: <AssignmentManagementPage />,
          },
          {
            path: `${APP_ROUTES.assignment.path}/${APP_ROUTES.assignment.create}`,
            element: <CreateAssignmentPage />,
          },
        ],
      },
    ],
  },
  {
    path: APP_ROUTES.auth.login,
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
]);
