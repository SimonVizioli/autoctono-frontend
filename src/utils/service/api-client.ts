import axios from "axios";
import { Navigate } from "react-router";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Token inválido o expirado, cerrando sesión...");
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");

            Navigate({ to: "/login" });
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
