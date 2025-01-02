import React, { useState } from "react";
import Crud from "@/utils/crud/crud";
import ProductForm from "./form";
import { fakeProducts } from "@/data/fake-data";
import ActionsColumn from "@/utils/actions/action-column";
import { Product } from "@/types/product";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(fakeProducts);

    const fetchAll = async () => products;

    const create = async (data: Product) => {
        setProducts([...products, { ...data, id: Date.now().toString() }]);
    };

    const update = async (updatedItem: Product) => {
        setProducts(
            products.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const deleteEntry = async (id: string) => {
        setProducts(products.filter((item) => item.id !== id));
    };

    return (
        <Crud
            title={
                <h1 className="text-2xl font-semibold">Gestion de Productos</h1>
            }
            columns={[
                { key: "nombre", label: "Nombre" },
                { key: "detalle", label: "Detalle" },
                { key: "codigo", label: "Código" },
                {
                    key: "tipoProducto_id",
                    label: "Tipo de Producto",
                    render: (item) => {
                        const tipoProducto = fakeProducts.find(
                            (tipo) => tipo.id === item.tipoProducto_id
                        );
                        return tipoProducto
                            ? tipoProducto.nombre
                            : "Desconocido";
                    },
                },
                { key: "cantidad", label: "Cantidad" },

                {
                    key: "precio",
                    label: "Precio",
                    render: (item) => `$ ${item.precio.toFixed(2)}`,
                },
                {
                    key: "costos",
                    label: "Costos",
                    render: (item) => `$ ${item.costos.toFixed(2)}`,
                },
            ]}
            customModalHeader={"Crear nuevo producto"}
            data={products}
            fetchAll={fetchAll}
            create={create}
            update={update}
            deleteEntry={deleteEntry}
            FormComponent={ProductForm}
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

export default ProductsPage;
