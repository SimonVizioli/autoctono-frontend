// src/components/forms/select-cliente.tsx
import { SaleStatusApi } from "@/service/api";
import { Status } from "@/types/status";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectStatusProps = {
    onChange: (value: string) => void;
    value?: string;
};

const SelectCliente: React.FC<SelectStatusProps> = ({ onChange, value }) => {
    const [status, setStatus] = useState<Status[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getStatus = (await SaleStatusApi.get()) as Status[];
            setStatus(getStatus);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };
    return (
        <FetchSelect
            data={status}
            onChange={onChange}
            value={value}
            placeholder="Selecciona un estado de venta "
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.name}
        />
    );
};

export default SelectCliente;
