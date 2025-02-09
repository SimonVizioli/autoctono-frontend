// src/components/forms/select-cliente.tsx
import { CustomersApi } from "@/service/api";
import { Customer } from "@/types/customer";
import FetchSelect from "@/utils/select/fetch-select";
import React, { useEffect, useState } from "react";

type SelectClienteProps = {
    onChange: (value: string) => void;
    initialValue?: string;
};

const SelectCliente: React.FC<SelectClienteProps> = ({
    onChange,
    initialValue,
}) => {
    const [customer, setCustomer] = useState<Customer[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialValue
    );

    const handleSelect = (customerId: string) => {
        setSelectedId(customerId); // Actualizas tu estado local

        const selectedCustomer = customer?.find(
            (customer) => customer.id == customerId
        );

        if (selectedCustomer) {
            selectedCustomer.id = customerId.toString();
            const id = selectedCustomer.id;
            onChange(id); // Notificas al padre el objeto seleccionado
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getCustomers = (await CustomersApi.get()) as Customer[];
            setCustomer(getCustomers);
        } catch (error: unknown) {
            console.error("Error en fetchAll:");
            throw error;
        }
    };
    return (
        <FetchSelect
            data={customer}
            onChange={handleSelect}
            value={selectedId}
            placeholder="Selecciona un cliente"
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.email}
        />
    );
};

export default SelectCliente;
