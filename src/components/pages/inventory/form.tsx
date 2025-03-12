import SelectProducto from "@/components/products/select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Inventory, unitOfMeasurement } from "@/types/inventory";
import React from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type InventoryFormProps = {
    onSubmit: (data: Inventory) => void;
    initialData?: Inventory;
};

const InventoryForm: React.FC<InventoryFormProps> = ({
    onSubmit,
    initialData,
}) => {
    const form = useForm<Inventory>({
        defaultValues: initialData || {
            quantity: 0,
            productId: "",
            product: {},
        },
    });

    const handleSubmit = (values: Inventory) => {
        values.productId = values.product.id;
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    name="product"
                    control={form.control}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Producto</FormLabel>
                                <FormControl>
                                    <SelectProducto
                                        onChange={(selectedProduct) => {
                                            field.onChange(selectedProduct);
                                        }}
                                        value={field?.value?.id?.toString()}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="unitOfMeasurement"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unidad de medida</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona Unidad de Medida" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(unitOfMeasurement).map(
                                            (unidad) => (
                                                <SelectItem
                                                    key={unidad}
                                                    value={unidad}
                                                >
                                                    {unidad === "unit"
                                                        ? "Unidad"
                                                        : "Gramos"}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium transition-all duration-300"
                >
                    Guardar
                </Button>
            </form>
        </Form>
    );
};

export default InventoryForm;
