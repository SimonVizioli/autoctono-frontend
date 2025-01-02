// src/components/forms/select-estado.tsx
import { fakeStatuses } from "@/data/fake-data";
import FetchSelect from "@/utils/select/fetch-select";
import React from "react";

type SelectEstadoProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

// Fake data para simular estados

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
