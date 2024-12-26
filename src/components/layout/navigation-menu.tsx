// src/Header/NavigationMenu.tsx
import { Link } from "react-router-dom";

const routes = [
    { title: "Inventario", path: "/stock" },
    { title: "Ventas", path: "/sales" },
    { title: "Clientes", path: "/customers" },
    { title: "Productos", path: "/products" },
];

const NavigationMenu: React.FC = () => {
    return (
        <nav className="hidden md:flex space-x-8">
            {routes.map(({ title, path }) => (
                <Link
                    key={path}
                    to={path}
                    className="text-ceramic-clay hover:text-ceramic-terracotta transition-colors text-sm font-medium"
                >
                    {title}
                </Link>
            ))}
        </nav>
    );
};

export default NavigationMenu;
