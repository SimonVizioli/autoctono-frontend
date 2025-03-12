import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductsApi } from "@/service/api";
import { Product } from "@/types/product";
import Crud from "@/utils/crud/crud";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpNarrowWide, CircleChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductForm from "./form";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [increasePercentage, setIncreasePercentage] = useState<number>(0);
    const [showIncreaseCosts, setShowIncreaseCosts] = useState(false);

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
                                  product.cost *
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
            <div className="container mx-auto bg-background rounded-md flex items-center gap-4">
                <AnimatePresence>
                    {showIncreaseCosts && (
                        <motion.div
                            key="increaseCosts" // clave única para identificar el elemento
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4"
                        >
                            <Input
                                type="number"
                                placeholder="Aumento %"
                                value={increasePercentage}
                                onChange={(e) =>
                                    setIncreasePercentage(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-32"
                            />
                            <Button
                                onClick={handleIncreaseCosts}
                                disabled={selectedProducts.length === 0}
                                variant={"outline"}
                                className="border-orange-500 hover:bg-amber-600"
                            >
                                <ArrowUpNarrowWide /> Aumentar Costo
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    onClick={() => setShowIncreaseCosts(!showIncreaseCosts)}
                    variant={"outline"}
                    className={`
                    } border-orange-500 hover:bg-amber-600 `}
                >
                    <CircleChevronRight
                        className={`${
                            showIncreaseCosts ? "rotate-180" : " "
                        } transition-transform ease-in-out duration-1000`}
                    />
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
