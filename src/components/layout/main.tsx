// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
