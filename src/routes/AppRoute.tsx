import Layout from "@/components/layout";
import RequestPage from "@/pages/requests/RequestPage";
import UserForm from "@/pages/users/CreateUserPage";
import LoginPage from "@/pages/auth/LoginPage";
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
