// src/components/forms/select-tipo-producto.tsx
import { ProductTypesApi } from "@/service/api";
import { ProductType } from "@/types/productType";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectTipoProductoProps = {
    onChange: (value: string) => void;
    value?: string;
};

const SelectTipoProducto: React.FC<SelectTipoProductoProps> = ({
    onChange,
    value,
}) => {
    const [productType, setProductType] = useState<ProductType[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getProductTypes =
                (await ProductTypesApi.get()) as ProductType[];
            setProductType(getProductTypes);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };

    return (
        <FetchSelect
            data={productType}
            onChange={onChange}
            value={value}
            placeholder="Selecciona un tipo de producto"
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.name}
        />
    );
};

export default SelectTipoProducto;
