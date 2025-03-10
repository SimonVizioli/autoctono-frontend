// src/components/pages/sales/sales.tsx
import { generateRemitoPDF } from "@/components/sales/generateRemitoPDF";
import { Button } from "@/components/ui/button";
import { SalesApi } from "@/service/api";
import { Sales } from "@/types/sales";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import SalesForm from "./form";

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sales[]>([]);

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
        try {
            const id = updatedItem.id;
            const data = updatedItem;
            const updatedSale = (await SalesApi.put(id, data)) as Sales;
            setSales((prevSales) =>
                prevSales.map((item) =>
                    item.id === updatedSale.id ? updatedSale : item
                )
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
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
            // Definimos los filtros a aplicar

            columns={[
                {
                    key: "detail",
                    label: "Detalle",
                    render: (row: Sales) => row?.detail,
                },
                {
                    key: "customerId",
                    label: "Cliente",
                    render: (row: Sales) =>
                        row?.customer?.id
                            ? `${row?.customer?.lastName}, ${row?.customer?.firstName}`
                            : "Cliente desconocido",
                },
                {
                    key: "statusId",
                    label: "Estado",
                    render: (row: Sales) =>
                        row?.status?.id
                            ? row?.status?.name
                            : "Estado desconocido",
                },
                {
                    key: "products",
                    label: "Cantidad de Productos",
                    render: (row: Sales) =>
                        row?.productSales?.length > 0
                            ? `${row?.productSales?.length}`
                            : "Sin productos",
                },
                {
                    key: "iva",
                    label: "IVA",
                    render: (row: Sales) => `${row?.iva} %`,
                },
                {
                    key: "total",
                    label: "Total",
                    render: (row: Sales) => `$ ${row?.total?.toFixed(2)}`,
                },
            ]}
            customModalHeader={"Crear nueva venta"}
            data={sales}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={SalesForm}
            filters={[
                { key: "detail", label: "Filtrar por detalle" },
                {
                    key: "customer",
                    label: "Filtrar por nombre o apellido",
                    render: (item, filterValue) => {
                        const lowerFilter = filterValue.toLowerCase();
                        return (
                            item.customer.firstName
                                .toLowerCase()
                                .includes(lowerFilter) ||
                            item.customer.lastName
                                .toLowerCase()
                                .includes(lowerFilter)
                        );
                    },
                },
            ]}
            renderActionsColumn={(item) => {
                return (
                    <Button
                        onClick={() => {
                            generateRemitoPDF(item);
                        }}
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
