// src/components/forms/select-tipo-producto.tsx
import FetchSelect from "@/utils/select/fetch-select";
import React from "react";

type SelectTipoProductoProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

// Fake data para simular tipos de productos
const fakeTiposProducto = [
    { id: "1", label: "Arcilla" },
    { id: "2", label: "Pintura" },
    { id: "3", label: "Cerámica" },
];

const SelectTipoProducto: React.FC<SelectTipoProductoProps> = ({
    onChange,
    initialValue,
}) => {
    return (
        <FetchSelect
            fakeData={fakeTiposProducto}
            onChange={onChange}
            initialValue={initialValue}
            placeholder="Selecciona un tipo de producto"
        />
    );
};

export default SelectTipoProducto;
