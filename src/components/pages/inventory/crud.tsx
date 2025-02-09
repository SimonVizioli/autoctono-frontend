import { StockApi } from "@/service/api";
import { Inventory } from "@/types/inventory";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import InventoryForm from "./form";

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<Inventory[]>([]);

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
        try {
            const saveStock = (await StockApi.post(data)) as Inventory;
            setInventory((prevInventory) => [...prevInventory, saveStock]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (updatedItem: Inventory) => {
        try {
            const id = updatedItem.id;
            const data = updatedItem;
            const updateStock = (await StockApi.put(id, data)) as Inventory;
            setInventory((prevInventory) =>
                prevInventory.map((item) =>
                    item.id === updateStock.id ? updateStock : item
                )
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            await StockApi.delete(id);
            setInventory((prevInventory) =>
                prevInventory.filter((item) => item.id !== id)
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
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
                    key: "product",
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
