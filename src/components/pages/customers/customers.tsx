// src/pages/customers/customers.tsx
import React, { useEffect, useState } from "react";
import ShadcnTable from "@/utils/table/shadcn-table";
import { fakeCustomers } from "@/data/fake-data";

interface Customer {
    id: string;
    razonSocial: string;
    nombre: string;
    apellido: string;
    email: string;
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetch("/api/customers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setCustomers(data));
    }, []);

    const columns: { key: keyof Customer; label: string }[] = [
        { key: "razonSocial", label: "Razón Social" },
        { key: "nombre", label: "Nombre" },
        { key: "apellido", label: "Apellido" },
        { key: "email", label: "Email" },
    ];

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <ShadcnTable data={fakeCustomers} columns={columns} />
        </div>
    );
};

export default Customers;
