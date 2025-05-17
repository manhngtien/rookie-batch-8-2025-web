import Layout from "@/components/layout";
import UserForm from "@/features/users/components/create-user";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
              path: "/create-user",
              element: <UserForm/>
            }
        ]
    }
])