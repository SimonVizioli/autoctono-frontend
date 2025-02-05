import { fakeInventory } from "@/data/fake-data";
import { Inventory } from "@/types/inventory";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import InventoryForm from "./form";
import { StockApi } from "@/service/api";

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<Inventory[]>(fakeInventory);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getStock = (await StockApi.get()) as Inventory[];
            setInventory(getStock);
            return getStock;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: Inventory) => {
        setInventory([...inventory, { ...data, id: Date.now().toString() }]);
    };

    const update = async (updatedItem: Inventory) => {
        setInventory(
            inventory.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const deleteEntry = async (id: string) => {
        setInventory(inventory.filter((item) => item.id !== id));
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-bold mb-4">
                    Gestión de Inventario
                </h1>
            }
            columns={[
                {
                    key: "producto",
                    label: "Producto",
                    render: (item) => item?.product?.name,
                },
                { key: "quantity", label: "Cantidad (gramos)" },
            ]}
            data={inventory}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={InventoryForm}
        />
    );
};

export default InventoryPage;
