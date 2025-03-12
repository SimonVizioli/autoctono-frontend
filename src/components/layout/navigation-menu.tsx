import React from "react";
import { Link, useLocation } from "react-router-dom";

const routes = [
    { title: "Inventario", path: "/stock" },
    { title: "Ventas", path: "/sales" },
    { title: "Productos", path: "/products" },
    { title: "Clientes", path: "/customers" },
    { title: "Categoría", path: "/product-types" },
    { title: "Estados de Ventas", path: "/sale-status" },
];

interface NavigationMenuProps {
    isMobile?: boolean;
    onLinkClick?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
    isMobile = false,
    onLinkClick,
}) => {
    const location = useLocation();

    return (
        <nav
            className={`${
                isMobile ? "flex flex-col" : "flex items-center space-x-1"
            }`}
        >
            {routes.map(({ title, path }) => (
                <Link
                    key={path}
                    to={path}
                    onClick={onLinkClick}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === path
                            ? "bg-orange-900/40 text-orange-100"
                            : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
                    }`}
                >
                    {title}
                </Link>
            ))}
        </nav>
    );
};

export default NavigationMenu;
