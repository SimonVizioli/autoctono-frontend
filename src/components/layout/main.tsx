import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
    <>
        <Header />
        <main className="pt-16">
            <Outlet />
        </main>
    </>
);

export default Layout;
