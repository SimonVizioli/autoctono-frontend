// src/pages/customers/customers.tsx
import { CustomersApi } from "@/service/api";
import { Customer } from "@/types/customer";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import CustomerForm from "./form";

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getCustomers = (await CustomersApi.get()) as Customer[];
            setCustomers(getCustomers);
            return getCustomers;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: Customer) => {
        try {
            const createCustomer = await CustomersApi.post(data);
            setCustomers((prevCustomers) => [
                ...prevCustomers,
                createCustomer as Customer,
            ]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (data: Customer) => {
        setCustomers(
            customers.map((item) => (item.id === data.id ? data : item))
        );
    };

    const deleteEntry = async (id: string) => {
        try {
            await CustomersApi.delete(id);
            setCustomers(customers.filter((item) => item.id !== id));
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-bold mb-4">Gestión de clientes</h1>
            }
            columns={[
                { key: "companyName", label: "Razón Social" },
                { key: "firstName", label: "Nombre" },
                { key: "lastName", label: "Apellido" },
                { key: "email", label: "Email" },
            ]}
            data={customers}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={CustomerForm}
        />
    );
};

export default Customers;
