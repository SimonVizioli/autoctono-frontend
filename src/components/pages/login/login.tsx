// src/pages/login/login.tsx
import React from "react";
import LoginForm from "./login-form";

const Login: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <LoginForm />
        </div>
    );
};

export default Login;
