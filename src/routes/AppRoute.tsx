import Layout from "@/components/layout";
import LoginPage from "@/pages/auth/LoginPage";
import UserDataTable from "@/features/users/components/user-data-table";
import { createBrowserRouter, Navigate } from "react-router";
import CreateUserPage from "@/pages/users/CreateUserPage";
import UserManagementPage from "@/pages/users/UserMangementPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/create-user",
        element: <CreateUserPage />,
      },
      {
        path: "/users",
        element: <UserManagementPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
