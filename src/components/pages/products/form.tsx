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
import { fakeProducts } from "@/data/fake-data";
import { Product } from "@/types/product";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProductFormProps = {
    onSubmit: (data: Product) => void;
    initialData?: Product;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
    const form = useForm<Product>({
        defaultValues: initialData || {
            codigo: "",
            detalle: "",
            nombre: "",
            precio: 0,
            costos: 0,
            tipoProducto_id: "",
            cantidad: 0,
        },
    });

    // Observar cambios en el tipo de producto
    const tipoProductoId = form.watch("tipoProducto_id");

    useEffect(() => {
        if (tipoProductoId) {
            // Fake data para los tipos de producto
            const tipoProducto = fakeProducts.find(
                (tipo) => tipo.id === tipoProductoId
            );
            if (tipoProducto) {
                form.setValue("codigo", tipoProducto.codigo); // Setear el código automáticamente
            }
        }
    }, [tipoProductoId, form]);

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
                {/* Código */}
                <FormField
                    name="codigo"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Código del producto"
                                    {...field}
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Detalle */}
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

                {/* Nombre */}
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

                {/* Precio */}
                <FormField
                    name="precio"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        {...field}
                                        className="pl-8"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Costos */}
                <FormField
                    name="costos"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Costos</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        {...field}
                                        className="pl-8"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Cantidad */}
                <FormField
                    name="cantidad"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Cantidad en stock"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tipo de Producto */}
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
