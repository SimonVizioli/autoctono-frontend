import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Menu, PocketKnife, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationMenu from "./navigation-menu";
import ThemeSwitcher from "./theme-switcher";
import UserDropdownMenu from "./user-dropwdown-menu";

export function Header() {
    const { isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

    return (
        <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-ceramic-terracotta hover:text-ceramic-clay transition-colors"
                    >
                        <PocketKnife className="h-6 w-6 text-orange-500" />
                        <span className="text-xl font-semibold text-white">
                            Autóctono
                        </span>
                    </Link>
                    {/* Menú de navegación en desktop */}
                    <div className="hidden md:block">
                        <NavigationMenu />
                    </div>
                </div>
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
                    {/* Botón de menú para mobile */}
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={toggleMobileMenu}>
                            <motion.div
                                key={isMobileMenuOpen ? "open" : "closed"}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.div>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Menú móvil: se muestra debajo del header */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <NavigationMenu
                        isMobile
                        onLinkClick={() => setMobileMenuOpen(false)}
                    />
                </div>
            )}
        </header>
    );
}

export default Header;
