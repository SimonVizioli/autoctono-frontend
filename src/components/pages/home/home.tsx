// src/pages/home/home.tsx
import React from "react";
import Dashboard from "@/components/dashboard/dashboard";
import useAuth from "@/hooks/use-auth";

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">
                            Ventas Totales
                        </h2>
                        <p className="text-2xl font-bold">$25,000</p>
                        <p className="text-sm text-muted-foreground">
                            Ingresos generados este mes
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">
                            Clientes Activos
                        </h2>
                        <p className="text-2xl font-bold">120</p>
                        <p className="text-sm text-muted-foreground">
                            Clientes registrados este mes
                        </p>
                    </div>
                </div>

                <Dashboard />
            </div>
        </div>
    );
};

export default Home;
