"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PocketKnife } from "lucide-react";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // TODO: Implement actual login logic here
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

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
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-ceramic-clay">
                            Correo Electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="border-ceramic-sand/20 bg-ceramic-light text-ceramic-dark placeholder:text-ceramic-rosewood/50"
                        />
                    </div>
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="password" className="text-ceramic-clay">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="border-ceramic-sand/20 bg-ceramic-light text-ceramic-dark placeholder:text-ceramic-rosewood/50"
                        />
                    </div>
                    <Button
                        className="w-full mt-6 bg-ceramic-terracotta text-ceramic-cream hover:bg-ceramic-clay"
                        disabled={isLoading}
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="px-8 text-center text-sm text-ceramic-clay">
                    <a
                        href="/forgot-password"
                        className="hover:text-ceramic-terracotta underline underline-offset-4"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </p>
            </CardFooter>
        </Card>
    );
}
