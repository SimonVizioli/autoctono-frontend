// src/components/pages/products/form.tsx
import SelectTipoProducto from "@/components/product-type/select";
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
import { Product } from "@/types/product";
import React from "react";
import { useForm } from "react-hook-form";

type ProductFormProps = {
    onSubmit: (data: Product) => void;
    initialData?: Product;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
    const form = useForm<Product>({
        defaultValues: initialData || {
            detalle: "",
            nombre: "",
            precio: 0,
            tipoProducto_id: "",
        },
    });

    const handleSubmit = (values: Product) => {
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
                                    placeholder="Descripción del producto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="nombre"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
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
                    name="precio"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
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
                    name="tipoProducto_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Producto</FormLabel>
                            <FormControl>
                                <SelectTipoProducto
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

export default ProductForm;
