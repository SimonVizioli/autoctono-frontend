// src/routes/protected-route.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
