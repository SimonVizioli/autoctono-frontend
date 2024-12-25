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
            cantidad: 0,
            producto: "",
        },
    });

    const handleSubmit = (values: Inventory) => {
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
                    name="producto"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Producto</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nombre del producto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="cantidad"
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
