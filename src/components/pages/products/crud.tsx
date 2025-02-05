import { fakeProducts } from "@/data/fake-data";
import { Product } from "@/types/product";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import ProductForm from "./form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductsApi } from "@/service/api";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(fakeProducts);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [increasePercentage, setIncreasePercentage] = useState<number>(0);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProducts = (await ProductsApi.get()) as Product[];
            setProducts(getProducts);
            console.log("getProducts", getProducts);
            return getProducts;
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

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

    // ✅ Manejar selección de productos
    const handleSelectProduct = (id: string) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((productId) => productId !== id)
                : [...prevSelected, id]
        );
    };

    // ✅ Aumentar costos de los productos seleccionados
    const handleIncreaseCosts = () => {
        if (increasePercentage <= 0) return;

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                selectedProducts.includes(product.id)
                    ? {
                          ...product,
                          costos: parseFloat(
                              (
                                  product.costos *
                                  (1 + increasePercentage / 100)
                              ).toFixed(2)
                          ),
                      }
                    : product
            )
        );

        setSelectedProducts([]); // Limpiar selección después de aplicar el aumento
        setIncreasePercentage(0);
    };

    return (
        <div>
            {/* ✅ Controles para aumentar costos */}
            <div className="container mx-auto p-4 bg-background rounded-md shadow-md flex items-center gap-4 mb-4">
                <Input
                    type="number"
                    placeholder="Aumento %"
                    value={increasePercentage}
                    onChange={(e) =>
                        setIncreasePercentage(Number(e.target.value))
                    }
                    className="w-32"
                />
                <Button
                    onClick={handleIncreaseCosts}
                    disabled={selectedProducts.length === 0}
                    className="bg-teal-500 text-white"
                >
                    Aumentar Costo
                </Button>
            </div>

            {/* ✅ Tabla de productos con checkboxes */}
            <Crud
                title={
                    <h1 className="text-2xl font-semibold">
                        Gestión de Productos
                    </h1>
                }
                columns={[
                    {
                        key: "seleccionar" as unknown as keyof Product,
                        label: "✔",
                        render: (row: Product) => (
                            <input
                                type="checkbox"
                                checked={selectedProducts.includes(row.id)}
                                onChange={() => handleSelectProduct(row.id)}
                            />
                        ),
                    },
                    { key: "name", label: "Nombre" },
                    { key: "detail", label: "Detalle" },
                    { key: "codigo", label: "Código" },
                    {
                        key: "tipoProducto_id",
                        label: "Tipo de Producto",
                        render: (item) => {
                            const tipoProducto = fakeProducts.find(
                                (tipo) => tipo.id === item.tipoProducto_id
                            );
                            return tipoProducto
                                ? tipoProducto.name
                                : "Desconocido";
                        },
                    },
                    { key: "cantidad", label: "Cantidad" },
                    {
                        key: "price",
                        label: "Precio",
                        render: (item) => `$ ${item.price}`,
                    },
                    {
                        key: "costos",
                        label: "Costos",
                        render: (item) => `$ ${item.costos}`,
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
