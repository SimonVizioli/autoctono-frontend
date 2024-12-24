// src/main.tsx
import "@/index.css"; // Asegúrate de que este archivo existe y está configurado
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/error";
import LoginPage from "./components/pages/login";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider, useAuth } from "./context/auth";

// Componente para rutas protegidas
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <LoginPage />;
};

// Configuración de rutas
const router = createHashRouter([
    {
        path: "/",
        element: <App />, // Layout principal
        errorElement: <ErrorPage />,
        children: [
            { path: "login", element: <LoginPage /> },
            {
                path: "stock",
                element: <ProtectedRoute element={<div>stock</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "products",
                element: <ProtectedRoute element={<div>productos</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "customers",
                element: <ProtectedRoute element={<div>clientes</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "sells",
                element: <ProtectedRoute element={<div>ventas</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "settings",
                element: <ProtectedRoute element={<div>Settings</div>} />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthProvider>
    </React.StrictMode>
);
