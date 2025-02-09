// src/components/forms/select-cliente.tsx
import { SaleStatusApi } from "@/service/api";
import { Status } from "@/types/status";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectStatusProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

const SelectCliente: React.FC<SelectStatusProps> = ({
    onChange,
    initialValue,
}) => {
    const [status, setStatus] = useState<Status[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialValue
    );

    const handleSelect = (statusId: string) => {
        setSelectedId(statusId); // Actualizas tu estado local

        const selectedStatus = status?.find((status) => status.id == statusId);

        if (selectedStatus) {
            selectedStatus.id = statusId.toString();
            const id = selectedStatus.id;
            onChange(id); // Notificas al padre el objeto seleccionado
        }
    };

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
            onChange={handleSelect}
            value={selectedId}
            placeholder="Selecciona un estado de venta "
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.name}
        />
    );
};

export default SelectCliente;
