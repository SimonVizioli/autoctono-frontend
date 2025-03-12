// src/pages/login/login-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, PocketKnife } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
// import { fakeUser } from "@/data/fake-user";

const loginSchema = z.object({
    username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: { username: string; password: string }) => {
        setIsLoading(true);
        const success = await login(values.username, values.password);
        if (success) {
            login(values.username, values.password);
            toast({
                title: "Inicio de sesión exitoso",
                description: "¡Bienvenido a Autóctono!",
                variant: "default",
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate("/");
            }, 1000);
        } else {
            setIsLoading(false);
            toast({
                title: "Error de inicio de sesión",
                description: "Credenciales inválidas. Intenta de nuevo.",
                variant: "destructive",
            });
            form.setError("username", { message: "Credenciales inválidas" });
            form.setError("password", { message: "" });
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center space-x-2 text-ceramic-terracotta">
                    <PocketKnife className="h-8 w-8 text-orange-600" />
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Autóctono
                    </CardTitle>
                </div>
                <CardDescription className="text-center text-slate-400">
                    Ingresa a tu cuenta para gestionar tu inventario
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="pb-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Nombre de Usuario
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500"
                                                placeholder="usuario@ejemplo.com"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">
                                        Contraseña
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500"
                                                placeholder="••••••••"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                                <span className="sr-only">
                                                    {showPassword
                                                        ? "Ocultar contraseña"
                                                        : "Mostrar contraseña"}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-8">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Iniciando sesión..."
                                    : "Iniciar Sesión"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
export default LoginForm;
