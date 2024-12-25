// src/components/forms/select-estado.tsx
import FetchSelect from "@/utils/select/fetch-select";
import React from "react";

type SelectEstadoProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

// Fake data para simular estados
const fakeStatuses = [
    { id: "1", label: "Pendiente" },
    { id: "2", label: "En proceso" },
    { id: "3", label: "Finalizada" },
];

const SelectEstado: React.FC<SelectEstadoProps> = ({
    onChange,
    initialValue,
}) => {
    return (
        <FetchSelect
            fakeData={fakeStatuses}
            onChange={onChange}
            initialValue={initialValue}
            placeholder="Selecciona un estado"
        />
    );
};

export default SelectEstado;
