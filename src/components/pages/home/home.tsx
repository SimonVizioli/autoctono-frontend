// src/pages/home/home.tsx
import Dashboard from "@/components/dashboard/dashboard";
import useAuth from "@/hooks/use-auth";
import React from "react";

const Home: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">
                    Bienvenido, {user?.name || "Usuario"}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                    ¡Nos alegra verte de nuevo! Aquí tienes un resumen de la
                    actividad reciente:
                </p>
                <Dashboard />
            </div>
        </div>
    );
};

export default Home;
