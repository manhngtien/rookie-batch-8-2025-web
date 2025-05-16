import Layout from "@/components/layout";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
    
])