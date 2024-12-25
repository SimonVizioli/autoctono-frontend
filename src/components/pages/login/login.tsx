// src/pages/login/login.tsx
import React from "react";
import LoginForm from "./login-form";
import useAuth from "@/hooks/use-auth";
import { Navigate, useLocation } from "react-router";

const Login: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Redirigir si ya está autenticado
    if (isAuthenticated) {
        const from = (location.state as { from: string })?.from || "/";
        return <Navigate to={from} replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <LoginForm />
        </div>
    );
};

export default Login;
