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
import ProductsPage from "@/components/pages/products/crud";
import ProductTypePage from "@/components/pages/product-type/crud";
import SaleStatusPage from "@/components/pages/sale-status/crud";

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
                element: <ProtectedRoute element={<ProductsPage />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "customers",
                element: <ProtectedRoute element={<Customers />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "product-types",
                element: <ProtectedRoute element={<ProductTypePage />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "sale-status",
                element: <ProtectedRoute element={<SaleStatusPage />} />,
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
