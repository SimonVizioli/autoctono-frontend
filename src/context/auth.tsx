// src/context/auth-context.tsx
import React, { createContext, useEffect, useState } from "react";
// import { fakeUser } from "@/data/fake-user";
import { LoginApi } from "@/service/api";
import { isTokenExpired } from "@/utils/auth/jwtDecode";

interface User {
    firstName: string;
    lastName: string;
    username: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

interface ResponseType {
    token: string;
    user: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Cargar el estado de autenticación desde localStorage
    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedAuth === "true" && storedUser && token) {
            const expired = isTokenExpired(token);
            if (!expired) {
                setIsAuthenticated(true);
                setUser(JSON.parse(storedUser));
            } else {
                // Si está vencido, limpiamos
                localStorage.removeItem("token");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("user");
                // isAuthenticated => false, user => null
            }
        }
    }, []);

    const login = async (
        username: string,
        password: string
    ): Promise<boolean> => {
        try {
            const response = (await LoginApi.post({
                username,
                password,
            })) as ResponseType;

            localStorage.setItem("token", response.token);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(response.user));
            setIsAuthenticated(true);
            setUser(response.user);
            return true;
        } catch (error: unknown) {
            console.error("Error en login:", error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
