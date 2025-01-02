// src/components/pages/sales/sales.tsx
import { fakeCustomers, fakeSales, fakeStatuses } from "@/data/fake-data";
import { Sales } from "@/types/sales";
import ActionsColumn from "@/utils/actions/action-column";
import Crud from "@/utils/crud/crud";
import React, { useState } from "react";
import SalesForm from "./form";

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sales[]>(fakeSales);

    const fetchAll = async () => sales;

    const create = async (data: Sales) => {
        setSales([...sales, { ...data, id: Date.now().toString() }]);
    };

    const update = async (updatedItem: Sales) => {
        setSales(
            sales.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const deleteEntry = async (id: string) => {
        setSales(sales.filter((item) => item.id !== id));
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
            }
            columns={[
                { key: "detalle", label: "Detalle" },
                {
                    key: "cliente_id",
                    label: "Cliente",
                    render: (row: Sales) =>
                        fakeCustomers.find(
                            (cliente) => cliente.id === row.cliente_id
                        )?.nombre || "Cliente desconocido",
                },
                {
                    key: "estado_id",
                    label: "Estado",
                    render: (row: Sales) =>
                        fakeStatuses.find(
                            (estado) => estado.id === row.estado_id
                        )?.label || "Estado desconocido",
                },
                {
                    key: "productos",
                    label: "Cantidad de Productos",
                    render: (row: Sales) =>
                        row.productos?.length > 0
                            ? `${row.productos.length}`
                            : "Sin productos",
                },
                {
                    key: "total",
                    label: "Total",
                    render: (row: Sales) => `$ ${row.total.toFixed(2)}`,
                },
            ]}
            data={sales}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={SalesForm}
            renderActionsColumn={(item) => (
                <ActionsColumn
                    item={item}
                    onEdit={(item) => console.log("Editar", item)}
                    onDelete={(id) => console.log("Eliminar", id)}
                />
            )}
        />
    );
};

export default SalesPage;
