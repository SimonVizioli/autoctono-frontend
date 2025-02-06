import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

type FetchSelectProps = {
    data?: { id: string; name: string }[];
    value: string | undefined; // Valor controlado
    onChange: (value: string) => void; // Callback cuando se selecciona un ítem
    placeholder: string; // Placeholder
};

const FetchSelect: React.FC<FetchSelectProps> = ({
    data = [],
    value,
    onChange,
    placeholder,
}) => {
    const handleSelectChange = (newValue: string) => {
        onChange(newValue);
    };

    return (
        <Select onValueChange={handleSelectChange} value={value}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((option) => (
                    <SelectItem
                        key={option.id.toString()}
                        value={option.id.toString()}
                    >
                        {option.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FetchSelect;
