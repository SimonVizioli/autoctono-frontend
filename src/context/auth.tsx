// src/context/auth-context.tsx
import React, { createContext, useEffect, useState } from "react";
import { fakeUser } from "@/data/fake-user";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
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
        if (storedAuth === "true" && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        if (email === fakeUser.email && password === fakeUser.password) {
            setIsAuthenticated(true);
            setUser({ name: fakeUser.name, email: fakeUser.email });
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem(
                "user",
                JSON.stringify({ name: fakeUser.name, email: fakeUser.email })
            );
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
