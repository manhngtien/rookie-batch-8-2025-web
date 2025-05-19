import Layout from "@/components/layout";
import UserForm from "@/features/users/components/create-user";
import LoginPage from "@/pages/auth/LoginPage";
import UserDataTable from "@/features/users/components/UserDataTable";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/create-user",
        element: <UserForm />,
      },
      {
        path: "/users",
        element: <UserDataTable />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
