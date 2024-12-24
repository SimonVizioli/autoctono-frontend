// src/Header/Header.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { PocketKnife } from "lucide-react";
import { Link } from "react-router-dom";
import NavigationMenu from "./navigation-menu";
import UserDropdownMenu from "./user-dropwdown-menu";
import ThemeSwitcher from "./theme-switcher";

export function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="fixed top-0 w-full bg-ceramic-light border-b border-ceramic-sand/20 backdrop-blur-sm z-50 h-16">
            <div className="container mx-auto px-4 flex items-center justify-between h-full">
                <Link
                    to="/"
                    className="flex items-center space-x-2 text-ceramic-terracotta hover:text-ceramic-clay transition-colors"
                >
                    <PocketKnife className="h-6 w-6" />
                    <span className="text-xl font-serif">Autóctono</span>
                </Link>
                <NavigationMenu />
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <UserDropdownMenu />
                    ) : (
                        <Link to="/login">
                            <Button
                                variant="ghost"
                                className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10 font-medium"
                            >
                                Iniciar Sesión
                            </Button>
                        </Link>
                    )}
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}

export default Header;
