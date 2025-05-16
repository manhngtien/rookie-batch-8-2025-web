import Layout from "@/components/layout";
import UserMangement from "@/pages/UserMangement";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <UserMangement />,
      },
    ],
  },
]);
