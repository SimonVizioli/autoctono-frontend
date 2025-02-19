import { SaleStatusApi } from "@/service/api";
import { ProductType } from "@/types/productType";
import { Status } from "@/types/status";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import SaleStatusForm from "./form";

const SaleStatusPage: React.FC = () => {
    const [saleStatus, setSaleStatus] = useState<Status[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getSaleStatus = (await SaleStatusApi.get()) as Status[];
            setSaleStatus(getSaleStatus);
            return getSaleStatus;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: Status) => {
        try {
            const saveSaleStatus = (await SaleStatusApi.post(
                data
            )) as ProductType;
            setSaleStatus((prevSaleStatus) => [
                ...prevSaleStatus,
                saveSaleStatus,
            ]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (updatedItem: Status) => {
        try {
            const id = updatedItem.id;
            const data = updatedItem;
            const updateSaleStatus = (await SaleStatusApi.put(
                id,
                data
            )) as ProductType;
            setSaleStatus((prevSaleStatus) =>
                prevSaleStatus.map((item) =>
                    item.id === updateSaleStatus.id ? updateSaleStatus : item
                )
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            await SaleStatusApi.delete(id);
            setSaleStatus((prevSaleStatus) =>
                prevSaleStatus.filter((item) => item.id !== id)
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
                    Gestión de Estados de Ventas
                </h1>
            }
            columns={[
                {
                    key: "name",
                    label: "Nombre",
                },
                { key: "code", label: "Código" },
                { key: "description", label: "Descripción" },
            ]}
            customModalHeader={"Crear nuevo estado de venta"}
            data={saleStatus}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={SaleStatusForm}
        />
    );
};

export default SaleStatusPage;
