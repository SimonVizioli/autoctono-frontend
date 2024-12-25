// src/pages/inventory/inventory.tsx
import ShadcnTable from "@/utils/table/shadcn-table";
import React, { useEffect, useState } from "react";
import { fakeStocks } from "@/data/fake-data";

interface Stock {
    id: string;
    cantidad: number;
    productoNombre: string;
}

const Inventory: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch("/api/stocks", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setStocks(data));
    }, []);

    const columns: { key: keyof Stock; label: string }[] = [
        { key: "productoNombre", label: "Producto" },
        { key: "cantidad", label: "Cantidad" },
    ];

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Inventario</h1>
            <ShadcnTable data={fakeStocks} columns={columns} />
        </div>
    );
};

export default Inventory;
