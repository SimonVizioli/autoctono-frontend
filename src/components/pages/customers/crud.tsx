// src/pages/customers/customers.tsx
import React, { useState } from "react";
import CustomerForm from "./form";
import { Customer } from "@/types/customer";
import Crud from "@/utils/crud/crud";
import { fakeCustomers } from "@/data/fake-data";
import ActionsColumnColumn from "@/utils/actions/action-column";

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(fakeCustomers);

    const create = async (data: Customer) => {
        setCustomers([...customers, { ...data, id: Date.now().toString() }]);
    };

    const update = async (data: Customer) => {
        setCustomers(
            customers.map((item) => (item.id === data.id ? data : item))
        );
    };

    const deleteEntry = async (id: string) => {
        setCustomers(customers.filter((item) => item.id !== id));
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-bold mb-4">Gestión de clientes</h1>
            }
            columns={[
                { key: "razonSocial", label: "Razón Social" },
                { key: "nombre", label: "Nombre" },
                { key: "apellido", label: "Apellido" },
                { key: "email", label: "Email" },
            ]}
            data={customers}
            fetchAll={() => Promise.resolve(customers)}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={CustomerForm}
            renderActionsColumn={(item) => (
                <ActionsColumnColumn
                    item={item}
                    onEdit={(item) => console.log("Editar", item)}
                    onDelete={(id) => console.log("Eliminar", id)}
                />
            )}
        />
    );
};

export default Customers;
