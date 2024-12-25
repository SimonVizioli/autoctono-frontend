// src/pages/sales/sales.tsx
import CustomTable from "@/utils/table/custom-table";
import { fakeSales } from "@/data/fake-data";
import React, { useEffect, useState } from "react";

interface Sale {
    id: string;
    detalle: string;
    total: number;
    clienteNombre: string;
    estado: string;
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        fetch("/api/sales", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setSales(data));
    }, []);

    const columns: { key: keyof Sale; label: string }[] = [
        { key: "detalle", label: "Detalle" },
        { key: "clienteNombre", label: "Cliente" },
        { key: "estado", label: "Estado" },
        { key: "total", label: "Total" },
    ];

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Ventas</h1>
            <CustomTable data={fakeSales} columns={columns} />
        </div>
    );
};

export default Sales;
