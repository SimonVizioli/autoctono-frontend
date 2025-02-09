import { ProductsApi } from "@/service/api";
import { Product } from "@/types/product";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectProductoProps = {
    onChange: (value: { id: string; price: number }) => void;
    initialValue?: string; // Solo el ID
};

const SelectProducto: React.FC<SelectProductoProps> = ({
    onChange,
    initialValue,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialValue
    );

    const handleSelect = (productId: string) => {
        setSelectedId(productId); // Actualizas tu estado local

        const selectedProduct = products?.find(
            (product) => product.id == productId
        );

        if (selectedProduct) {
            selectedProduct.id = productId.toString();
            onChange({
                id: productId.toString(),
                price: selectedProduct.price,
            }); // Notificas al padre el objeto seleccionado
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProducts = (await ProductsApi.get()) as Product[];
            setProducts(getProducts);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    return (
        <FetchSelect
            data={products}
            onChange={handleSelect}
            value={selectedId}
            placeholder="Selecciona un producto"
            getKey={(product) => String(product.id)}
            getLabel={(product) => product.name}
        />
    );
};

export default SelectProducto;
