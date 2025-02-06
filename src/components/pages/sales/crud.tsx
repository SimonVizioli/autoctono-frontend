// src/components/pages/sales/sales.tsx
import { generateRemitoPDF } from "@/components/sales/generateRemitoPDF";
import { Button } from "@/components/ui/button";
import { fakeCustomers, fakeSales, fakeStatuses } from "@/data/fake-data";
import { Sales } from "@/types/sales";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import SalesForm from "./form";
import { SalesApi } from "@/service/api";

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sales[]>(fakeSales);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getSales = (await SalesApi.dto.get()) as Sales[];
            setSales(getSales);
            return getSales;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: Sales) => {
        try {
            const createSale = (await SalesApi.post(data)) as Sales;
            setSales((prevSales) => [...prevSales, createSale]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (updatedItem: Sales) => {
        setSales(
            sales.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const deleteEntry = async (id: string) => {
        try {
            await SalesApi.delete(id);
            setSales((prevSales) => prevSales.filter((item) => item.id !== id));
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
            }
            columns={[
                {
                    key: "detail",
                    label: "Detalle",
                    render: (row: Sales) => row?.detail,
                },
                {
                    key: "cliente_id",
                    label: "Cliente",
                    render: (row: Sales) =>
                        row?.customer?.id
                            ? `${row?.customer?.lastName}, ${row?.customer?.firstName}`
                            : "Cliente desconocido",
                },
                {
                    key: "estado_id",
                    label: "Estado",
                    render: (row: Sales) =>
                        row?.status?.id
                            ? row?.status?.name
                            : "Estado desconocido",
                },
                {
                    key: "productos",
                    label: "Cantidad de Productos",
                    render: (row: Sales) =>
                        row?.productSales?.length > 0
                            ? `${row?.productSales?.length}`
                            : "Sin productos",
                },
                {
                    key: "total",
                    label: "Total",
                    render: (row: Sales) => `$ ${row?.total?.toFixed(2)}`,
                },
            ]}
            data={sales}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={SalesForm}
            renderActionsColumn={(item) => {
                return (
                    <Button
                        onClick={() => generateRemitoPDF(item)}
                        className="ml-2 bg-teal-400 dark:text-white text-black"
                        variant={"default"}
                    >
                        Generar Remito
                    </Button>
                );
            }}
        />
    );
};

export default SalesPage;
