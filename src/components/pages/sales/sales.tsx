// src/components/pages/sales/sales.tsx
import React, { useState } from "react";
import Crud from "@/utils/crud/crud";
import SalesForm from "./form";
import { Sales } from "@/types/sales";
import ActionsColumn from "@/utils/actions/action-column";
import { fakeSales } from "@/data/fake-data";

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
            columns={[
                { key: "detalle", label: "Detalle" },
                { key: "total", label: "Total" },
                { key: "cliente_id", label: "Cliente" },
                { key: "estado_id", label: "Estado" },
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
