// src/components/layout/main.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import useAuth from "@/hooks/use-auth";

const Layout: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Mostrar el header solo si el usuario está autenticado */}
            {isAuthenticated && <Header />}
            <main className={isAuthenticated ? "pt-16" : ""}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
