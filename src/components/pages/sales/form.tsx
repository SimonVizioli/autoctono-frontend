// src/components/pages/sales/form.tsx
import SelectCliente from "@/components/clients/select";
import SelectEstado from "@/components/states/select";
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
import { Sales } from "@/types/sales";
import React from "react";
import { useForm } from "react-hook-form";

type SalesFormProps = {
    onSubmit: (data: Sales) => void; // Cambiar 'any' por el tipo correcto
    initialData?: Sales;
};

const SalesForm: React.FC<SalesFormProps> = ({ onSubmit, initialData }) => {
    const form = useForm<Sales>({
        defaultValues: initialData || {
            detalle: "",
            total: 0,
            cliente_id: "",
            estado_id: "",
        },
    });

    const handleSubmit = (values: Sales) => {
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
                    name="detalle"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Detalle</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Detalle de la venta"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="total"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="cliente_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cliente</FormLabel>
                            <FormControl>
                                <SelectCliente
                                    onChange={field.onChange}
                                    initialValue={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="estado_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <SelectEstado
                                    onChange={field.onChange}
                                    initialValue={field.value}
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

export default SalesForm;
