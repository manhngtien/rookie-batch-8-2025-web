import Layout from "@/components/layout";
import UserForm from "@/pages/users/CreateUserPage";
import UserMangement from "@/pages/users/UserMangementPage";
import { createBrowserRouter } from "react-router";

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
    ],
  },
]);
