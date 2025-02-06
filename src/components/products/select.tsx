import { ProductsApi } from "@/service/api";
import { Product } from "@/types/product";
import FetchSelect from "@/utils/select/fetch-select copy";
import React, { useEffect, useState } from "react";

type SelectProductoProps = {
    onChange: (value: { id: string; unitPrice: number }) => void;
    initialValue?: string;
};

const SelectProducto: React.FC<SelectProductoProps> = ({
    onChange,
    initialValue,
}) => {
    const [products, setProducts] = useState<Product[]>();
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialValue
    );

    const handleSelect = (productId: string) => {
        setSelectedId(productId); // Actualizas tu estado local

        const selectedProduct = products?.find(
            (product) => product.id == productId
        );
        console.log(
            "Encontro productId",
            productId,
            "selected",
            selectedProduct
        );
        if (selectedProduct) {
            console.log("entro al if", selectedProduct);
            selectedProduct.id = productId.toString();
            onChange({
                id: productId.toString(),
                unitPrice: selectedProduct.price,
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
        />
    );
};

export default SelectProducto;
