import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FetchSelectProps<T> = {
    data: T[];
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder: string;
    // Funciones para obtener el "id" (o key) y el "name" (o label)
    getKey: (item: T) => string;
    getLabel: (item: T) => string;
};

const FetchSelect = <T,>({
    data,
    value,
    onChange,
    placeholder,
    getKey,
    getLabel,
}: FetchSelectProps<T>) => {
    const handleSelectChange = (newValue: string) => {
        onChange(newValue);
    };

    return (
        <Select onValueChange={handleSelectChange} value={value}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((item) => {
                    const key = getKey(item);
                    const label = getLabel(item);
                    return (
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default FetchSelect;
