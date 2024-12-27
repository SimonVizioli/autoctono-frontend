import React from "react";
import FetchSelect from "@/utils/select/fetch-select";
import { fakeProducts } from "@/data/fake-data";

type SelectProductoProps = {
    onChange: (value: { id: string; precio: number; detalle: string }) => void;
    initialValue?: string;
};

const SelectProducto: React.FC<SelectProductoProps> = ({
    onChange,
    initialValue,
}) => {
    const handleSelect = (productId: string) => {
        const selectedProduct = fakeProducts.find(
            (product) => product.id === productId
        );

        if (selectedProduct) {
            onChange({
                id: selectedProduct.id,
                precio: selectedProduct.precio,
                detalle: selectedProduct.detalle,
            });
        }
    };

    return (
        <FetchSelect
            fakeData={fakeProducts.map((product) => ({
                id: product.id,
                label: product.nombre,
            }))}
            onChange={handleSelect}
            initialValue={initialValue}
            placeholder="Selecciona un producto"
        />
    );
};

export default SelectProducto;
