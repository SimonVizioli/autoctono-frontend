import { toast } from "@/hooks/use-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        // Si el error tiene respuesta, extraemos el mensaje
        if (error.response) {
            const message =
                error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Ocurrió un error inesperado";
            // Mostramos el toast con el error
            toast({
                title: "Error",
                description: message,
            });

            // Si el error es de autenticación, manejamos la sesión
            if (error.response && error.response.status === 401) {
                console.error("Token inválido o expirado, cerrando sesión...");
                localStorage.removeItem("token");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("user");

                window.location.href = "/login";
            }
        } else {
            // Errores sin respuesta (problemas de red, por ejemplo)
            toast({
                title: "Error",
                description: "Error de red, inténtalo nuevamente.",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
