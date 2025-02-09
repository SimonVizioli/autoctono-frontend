// src/components/forms/select-tipo-producto.tsx
import { ProductTypesApi } from "@/service/api";
import { ProductType } from "@/types/productType";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectTipoProductoProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

const SelectTipoProducto: React.FC<SelectTipoProductoProps> = ({
    onChange,
    initialValue,
}) => {
    const [productType, setProductType] = useState<ProductType[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialValue
    );

    const handleSelect = (productTypeId: string) => {
        setSelectedId(productTypeId); // Actualizas tu estado local

        const selectedProductType = productType?.find(
            (product) => product.id == productTypeId
        );

        if (selectedProductType) {
            selectedProductType.id = productTypeId.toString();
            const id = selectedProductType.id;
            onChange(id); // Notificas al padre el objeto seleccionado
        }
    };

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
            onChange={handleSelect}
            value={selectedId}
            placeholder="Selecciona un tipo de producto"
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.name}
        />
    );
};

export default SelectTipoProducto;
