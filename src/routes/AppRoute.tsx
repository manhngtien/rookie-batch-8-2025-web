import Layout from "@/components/layout";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout />
    }
])