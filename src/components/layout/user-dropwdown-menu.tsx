// src/Header/UserDropdownMenu.tsx
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { LogOut, User } from "lucide-react";

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
