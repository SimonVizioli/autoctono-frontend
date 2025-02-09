// src/components/ui/fetch-select.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

type FetchSelectProps = {
    url?: string; // Endpoint para fetchear los datos (opcional si usamos fakeData)
    fakeData?: { id: string; label: string }[]; // Datos simulados
    onChange: (value: string) => void; // Callback cuando se selecciona un ítem
    initialValue?: string; // Valor inicial a preseleccionar
    placeholder: string; // Placeholder para el select
};

type Option = {
    id: string;
    label: string;
};

const FetchSelect: React.FC<FetchSelectProps> = ({
    url,
    fakeData,
    onChange,
    initialValue,
    placeholder,
}) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedValue, setSelectedValue] = useState(initialValue || "");

    useEffect(() => {
        if (fakeData) {
            // Si fakeData está presente, usarlo como opciones
            setOptions(fakeData);
        } else if (url) {
            // Fetch de los datos desde el endpoint
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setOptions(
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data.map((item: any) => ({
                            id: item.id,
                            label: item.name || item.razonSocial || item.nombre, // Cambia según la estructura de tu backend
                        }))
                    );
                } catch (error) {
                    console.error("Error al obtener datos:", error);
                }
            };

            fetchData();
        }
    }, [url, fakeData]);

    useEffect(() => {
        // Si hay un valor inicial, preseleccionarlo
        if (initialValue) {
            setSelectedValue(initialValue);
        }
    }, [initialValue]);

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        onChange(value); // Callback para notificar el valor seleccionado
    };

    return (
        <Select onValueChange={handleSelectChange} value={selectedValue}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FetchSelect;
