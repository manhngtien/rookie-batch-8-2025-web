import Layout from "@/components/layout";
import RequestPage from "@/pages/requests/RequestPage";
import UserForm from "@/pages/users/CreateUserPage";
import LoginPage from "@/pages/LoginPage";
import UserMangement from "@/pages/users/UserMangementPage";
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
        path: "users",
        element: <UserMangement />,
      },
      {
        path: "returns",
        element: <RequestPage/>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
