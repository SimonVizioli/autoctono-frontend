// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "@/index.css"; // Asegúrate de que este archivo existe y está configurado
import { AuthProvider, useAuth } from "./context/auth";
import LoginPage from "./components/pages/login";
import App from "./App";
import ErrorPage from "./components/error";

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
                path: "productos",
                element: <ProtectedRoute element={<div>productos</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "clientes",
                element: <ProtectedRoute element={<div>clientes</div>} />,
                errorElement: <ErrorPage />,
            },
            {
                path: "ventas",
                element: <ProtectedRoute element={<div>ventas</div>} />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
