import React, { useEffect, useState } from "react";
import { CustomersApi } from "@/service/api";
import { Customer } from "@/types/customer";
import FetchSelect from "@/utils/select/fetch-select";

type SelectClienteProps = {
    onChange: (value: string) => void;
    value?: string; // Renombramos initialValue a value para enfatizar que es controlado
};

const SelectCliente: React.FC<SelectClienteProps> = ({ onChange, value }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const getCustomers = (await CustomersApi.get()) as Customer[];
            setCustomers(getCustomers);
        } catch (error: unknown) {
            console.error("Error en fetchAll:", error);
        }
    };

    return (
        <FetchSelect
            data={customers}
            onChange={onChange}
            value={value} // Usamos el valor recibido directamente
            placeholder="Selecciona un cliente"
            getKey={(item) => item.id.toString()}
            getLabel={(item) => item.email}
        />
    );
};

export default SelectCliente;
