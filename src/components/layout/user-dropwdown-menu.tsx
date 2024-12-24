// src/Header/UserDropdownMenu.tsx
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdownMenu: React.FC = () => {
    const { logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10"
                >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Menú de usuario</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56 bg-ceramic-light border-ceramic-sand/20 shadow-md"
            >
                <DropdownMenuItem asChild>
                    <Link
                        to="/settings"
                        className="flex items-center space-x-2"
                    >
                        <Settings className="h-4 w-4 text-ceramic-clay" />
                        <span>Configuración</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center space-x-2"
                >
                    <LogOut className="h-4 w-4 text-ceramic-clay" />
                    <span>Cerrar Sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
