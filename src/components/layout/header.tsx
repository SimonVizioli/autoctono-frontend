import { Button } from "@/components/ui/button";
import { User, PocketKnife } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="fixed top-0 w-full bg-ceramic-light border-b border-ceramic-sand/20 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-ceramic-terracotta hover:text-ceramic-clay transition-colors"
                    >
                        <PocketKnife className="h-6 w-6" />
                        <span className="text-xl font-serif">Autóctono</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        {[
                            ["Inventario", "/inventory"],
                            ["Pedidos", "/orders"],
                            ["Proveedores", "/suppliers"],
                        ].map(([title, url]) => (
                            <Link
                                key={url}
                                to={url}
                                className="text-ceramic-clay hover:text-ceramic-terracotta transition-colors text-sm font-medium"
                            >
                                {title}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <Button
                                variant="ghost"
                                className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10 font-medium"
                            >
                                Iniciar Sesión
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10"
                                >
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">
                                        Menú de usuario
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 bg-ceramic-light border-ceramic-sand/20"
                            >
                                <DropdownMenuItem className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10">
                                    Mi Perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10">
                                    Configuración
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-ceramic-sand/20" />
                                <DropdownMenuItem className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10">
                                    Cerrar Sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
