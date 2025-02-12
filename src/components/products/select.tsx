import { ProductsApi } from "@/service/api";
import { Product } from "@/types/product";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectProductoProps = {
    onChange: (value: { id: string; price: number }) => void;
    value?: string; // Se recibe el valor como string
};

const SelectProducto: React.FC<SelectProductoProps> = ({ onChange, value }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProducts = (await ProductsApi.get()) as Product[];
            setProducts(getProducts);
        } catch (error: unknown) {
            console.error("Error en fetchAll:", error);
            throw error;
        }
    };

    const handleSelect = (productId: string) => {
        // Busca el producto seleccionado comparando en formato string
        const selectedProduct = products.find(
            (product) => product.id.toString() === productId
        );
        if (selectedProduct) {
            // Notifica al componente padre el objeto seleccionado
            onChange({
                id: productId,
                price: selectedProduct.price,
            });
        }
    };

    return (
        <FetchSelect
            data={products}
            onChange={handleSelect}
            value={value} // Se utiliza el valor recibido directamente, sin estado interno duplicado
            placeholder="Selecciona un producto"
            getKey={(product) => product.id.toString()}
            getLabel={(product) => product.name}
        />
    );
};

export default SelectProducto;
