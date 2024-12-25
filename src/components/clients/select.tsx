// src/components/forms/select-cliente.tsx
import FetchSelect from "@/utils/select/fetch-select";
import React from "react";

type SelectClienteProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

// Fake data para simular clientes
const fakeClients = [
    { id: "1", label: "Empresa XYZ" },
    { id: "2", label: "Juan Pérez" },
    { id: "3", label: "María López" },
];

const SelectCliente: React.FC<SelectClienteProps> = ({
    onChange,
    initialValue,
}) => {
    return (
        <FetchSelect
            fakeData={fakeClients}
            onChange={onChange}
            initialValue={initialValue}
            placeholder="Selecciona un cliente"
        />
    );
};

export default SelectCliente;
