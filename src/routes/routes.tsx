// src/routes.tsx
import App from "@/App";
import ErrorPage from "@/components/pages/error";
import Dashboard from "@/components/pages/home/home";
import LoginPage from "@/components/pages/login/login";
import { createHashRouter } from "react-router-dom";
import ProtectedRoute from "./protected-routes";

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
                element: <ProtectedRoute element={<div>Stock</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "products",
                element: <ProtectedRoute element={<div>Productos</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "customers",
                element: <ProtectedRoute element={<div>Clientes</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "sells",
                element: <ProtectedRoute element={<div>Ventas</div>} />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

export default router;
