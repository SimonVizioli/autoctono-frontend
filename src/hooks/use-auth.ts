import { AuthContext } from "@/context/auth";
import { useContext } from "react";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export default useAuth;
