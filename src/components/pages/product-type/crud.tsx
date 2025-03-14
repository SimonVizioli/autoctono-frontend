import { ProductTypesApi } from "@/service/api";
import { ProductType } from "@/types/productType";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import ProductTypeForm from "./form";

const ProductTypePage: React.FC = () => {
    const [productType, setProductType] = useState<ProductType[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProductType =
                (await ProductTypesApi.get()) as ProductType[];
            setProductType(getProductType);
            return getProductType;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: ProductType) => {
        try {
            const saveProductType = (await ProductTypesApi.post(
                data
            )) as ProductType;
            setProductType((prevProductType) => [
                ...prevProductType,
                saveProductType,
            ]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (updatedItem: ProductType) => {
        try {
            const id = updatedItem.id;
            const data = updatedItem;
            const updateProductType = (await ProductTypesApi.put(
                id,
                data
            )) as ProductType;
            setProductType((prevProductType) =>
                prevProductType.map((item) =>
                    item.id === updateProductType.id ? updateProductType : item
                )
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            await ProductTypesApi.delete(id);
            setProductType((prevProductType) =>
                prevProductType.filter((item) => item.id !== id)
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
                    Gestión de Categorias
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
            customModalHeader={"Crear nueva categoría de producto"}
            data={productType}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={ProductTypeForm}
        />
    );
};

export default ProductTypePage;
