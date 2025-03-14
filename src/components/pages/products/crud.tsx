import { ProductsApi } from "@/service/api";
import { Product } from "@/types/product";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import ProductForm from "./form";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProducts = (await ProductsApi.get()) as Product[];
            setProducts(getProducts);
            return getProducts;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const create = async (data: Product) => {
        try {
            const createProduct = await ProductsApi.post(data);
            setProducts((prevProducts) => [
                ...prevProducts,
                createProduct as Product,
            ]);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const update = async (updatedItem: Product) => {
        try {
            const id = updatedItem.id;
            const data = updatedItem;
            const updatedProduct = (await ProductsApi.put(id, data)) as Product;

            setProducts((prevProducts) =>
                prevProducts.map((item) =>
                    item.id === updatedProduct.id ? updatedProduct : item
                )
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            await ProductsApi.delete(id);
            setProducts((prevProducts) =>
                prevProducts.filter((item) => item.id !== id)
            );
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    return (
        <div>
            {/* ✅ Tabla de productos con checkboxes */}
            <Crud
                title={
                    <h1 className="text-2xl font-semibold">
                        Gestión de Productos
                    </h1>
                }
                columns={[
                    { key: "name", label: "Nombre" },
                    { key: "detail", label: "Detalle" },
                    {
                        key: "productTypeId",
                        label: "Categoría",
                        render: (item) => {
                            return <div>{item.productType.name}</div>;
                        },
                    },
                    {
                        key: "code",
                        label: "Código",
                    },
                    {
                        key: "price",
                        label: "Precio",
                        render: (item) => `$ ${item.price}`,
                    },
                    {
                        key: "cost",
                        label: "Costos",
                        render: (item) => `$ ${item.cost}`,
                    },
                ]}
                filters={[
                    { key: "name", label: "Nombre" },
                    { key: "detail", label: "Detalle" },
                    { key: "code", label: "Código" },
                    {
                        key: "productTypeId",
                        label: "Categoría",
                        render: (item, filterValue) => {
                            const lowerFilter = filterValue.toLowerCase();
                            return item.name
                                .toLowerCase()
                                .includes(lowerFilter);
                        },
                    },
                ]}
                customModalHeader={"Crear nuevo producto"}
                data={products}
                fetchAll={fetchAll}
                create={create}
                update={update}
                deleteEntry={deleteEntry}
                FormComponent={ProductForm}
            />
        </div>
    );
};

export default ProductsPage;
