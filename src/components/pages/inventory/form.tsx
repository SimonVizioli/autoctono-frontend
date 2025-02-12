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
import { Inventory } from "@/types/inventory";
import React from "react";
import { useForm } from "react-hook-form";

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
                            <FormLabel>Cantidad (gramos)</FormLabel>
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
                <Button type="submit" className="w-full">
                    Guardar
                </Button>
            </form>
        </Form>
    );
};

export default InventoryForm;
