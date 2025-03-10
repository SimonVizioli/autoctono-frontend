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
import { PocketKnife } from "lucide-react";
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
                    <PocketKnife className="h-8 w-8" />
                    <CardTitle className="text-2xl font-serif">
                        Autóctono
                    </CardTitle>
                </div>
                <CardDescription className="text-center text-ceramic-clay">
                    Ingresa a tu cuenta para gestionar tu inventario
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de Usuario</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="JohnDoe"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-6 bg-ceramic-terracotta text-ceramic-cream hover:bg-ceramic-clay"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Iniciando sesión..."
                                : "Iniciar Sesión"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
export default LoginForm;
