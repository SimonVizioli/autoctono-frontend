// src/routes.tsx
import App from "@/App";
import ErrorPage from "@/components/pages/error";
import Dashboard from "@/components/pages/home/home";
import LoginPage from "@/components/pages/login/login";
import { createHashRouter } from "react-router-dom";
import ProtectedRoute from "./protected-routes";
import Inventory from "@/components/pages/inventory/crud";
import Sales from "@/components/pages/sales/crud";
import Customers from "@/components/pages/customers/crud";

// Configuración de rutas
const router = createHashRouter([
    {
        path: "/",
        element: <App />, // Layout principal
        errorElement: <ErrorPage />,
        children: [
            { path: "login", element: <LoginPage /> },
            {
                path: "",
                element: <ProtectedRoute element={<Dashboard />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "stock",
                element: <ProtectedRoute element={<Inventory />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "products",
                element: <ProtectedRoute element={<div>Productos</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "customers",
                element: <ProtectedRoute element={<Customers />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "sales",
                element: <ProtectedRoute element={<Sales />} />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

export default router;
