// src/main.tsx
import "@/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/toaster";
import router from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthProvider>
    </React.StrictMode>
);
