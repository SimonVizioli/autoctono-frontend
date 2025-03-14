import { ProductsApi, ProductTypesApi } from "@/service/api";
import { Product } from "@/types/product";
import Crud from "@/utils/crud/crud";
import React, { useEffect, useState } from "react";
import ProductForm from "./form";
import { toast } from "@/hooks/use-toast";
import SelectTipoProducto from "@/components/product-type/select";
import Modal from "@/utils/modal/modal";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCatalogPDF } from "@/components/products/generateCatalogoPDF";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // Estados para el formulario del modal
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [amountToIncrease, setAmountToIncrease] = useState<number>(0);
    const [loadingCatalogo, setLoadingCatalogo] = useState<boolean>(false);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProducts = (await ProductsApi.get()) as Product[];
            setProducts(getProducts);
            return getProducts;
        } catch (error: unknown) {
            console.error("Error en fetchAll:", error);
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
            console.error("Error en create:", error);
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
            console.error("Error en update:", error);
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
            console.error("Error en delete:", error);
            throw error;
        }
    };

    // Función que se ejecuta al enviar el formulario del modal.
    // Se envía al endpoint con el body { amountToIncrease, productsId }
    const handleModalSubmit = async () => {
        if (!selectedCategoryId) {
            toast({
                title: "Error",
                description: "Debes seleccionar una categoría.",
                variant: "destructive",
            });
            return;
        }
        // Filtrar todos los productos cuya propiedad productTypeId coincida con la categoría seleccionada
        const matchingProducts = products.filter(
            (p) => p.productTypeId.toString() === selectedCategoryId
        );
        if (matchingProducts.length === 0) {
            toast({
                title: "Error",
                description:
                    "No se encontraron productos para la categoría seleccionada.",
                variant: "destructive",
            });
            return;
        }
        const productsIds = matchingProducts.map((p) => p.id);
        const body = {
            amountToIncrease,
            productsId: productsIds,
        };
        try {
            await ProductTypesApi.updatePrices.putWithBody(body);
            toast({
                title: "Precios actualizados",
                description: "Los precios se han actualizado correctamente.",
                variant: "default",
            });
            fetchAll();
            // Reiniciamos los estados del modal
            setIsModalOpen(false);
            setSelectedCategoryId("");
            setAmountToIncrease(0);
        } catch (error: unknown) {
            console.error("Error en updatePrices:", error);
            toast({
                title: "Error",
                description: "No se pudieron actualizar los precios.",
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <div className="flex p-4 container mx-auto gap-2">
                <div>
                    <Button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <ArrowUpCircle className="h-5 w-5" />
                        Actualizar Precios
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            setLoadingCatalogo(true);
                            setTimeout(() => {
                                generateCatalogPDF(products);
                                setLoadingCatalogo(false);
                            }, 2000); // Pequeño retardo para que se actualice el estado en la UI
                        }}
                        variant={"outline"}
                        disabled={loadingCatalogo}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        {loadingCatalogo ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <FileText className="mr-2" />
                        )}{" "}
                        Generar Catálogo
                    </Button>
                </div>
            </div>
            {/* Modal para seleccionar categoría y porcentaje */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Actualizar Precios"
                className="max-w-4xl"
            >
                <div className="space-y-4">
                    <div className="flex gap-4 items-end">
                        <div className="w-full">
                            <label className="block mb-1 font-medium">
                                Porcentaje a aumentar (%)
                            </label>
                            <Input
                                type="number"
                                placeholder="Ej: 10"
                                value={amountToIncrease}
                                onChange={(e) =>
                                    setAmountToIncrease(
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                            />
                        </div>
                        <div className="w-full">
                            <SelectTipoProducto
                                onChange={(value) =>
                                    setSelectedCategoryId(value)
                                }
                                value={selectedCategoryId}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <X className="h-5 w-5" />
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleModalSubmit}
                            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <ArrowUpCircle className="h-5 w-5" />
                            Aplicar aumento
                        </Button>
                    </div>
                </div>
            </Modal>
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
                        render: (item: Product) => (
                            <div>{item.productType.name}</div>
                        ),
                    },
                    { key: "code", label: "Código" },
                    {
                        key: "price",
                        label: "Precio",
                        render: (item: Product) => `$ ${item.price}`,
                    },
                    {
                        key: "cost",
                        label: "Costos",
                        render: (item: Product) => `$ ${item.cost}`,
                    },
                ]}
                filters={[
                    { key: "name", label: "Nombre" },
                    { key: "detail", label: "Detalle" },
                    { key: "code", label: "Código" },
                    {
                        key: "productTypeId",
                        label: "Categoría",
                        render: (item: Product, filterValue: string) => {
                            const lowerFilter = filterValue.toLowerCase();
                            return item.productType.name
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
