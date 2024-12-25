// src/Header/ThemeSwitcher.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "../ui/theme-provider";

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-ceramic-clay hover:text-ceramic-terracotta hover:bg-ceramic-sand/10"
        >
            <motion.div
                key={theme}
                initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "light" ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </motion.div>
            <span className="sr-only">Cambiar tema</span>
        </Button>
    );
};

export default ThemeSwitcher;
