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
import { ProductType } from "@/types/productType";
import React from "react";
import { useForm } from "react-hook-form";

type ProductTypeFormProps = {
    onSubmit: (data: ProductType) => void;
    initialData?: ProductType;
};

const ProductTypeForm: React.FC<ProductTypeFormProps> = ({
    onSubmit,
    initialData,
}) => {
    const form = useForm<ProductType>({
        defaultValues: initialData || {
            name: "",
            code: "",
            description: "",
            defaultSalePercentage: 0,
        },
    });

    const handleSubmit = (values: ProductType) => {
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
                    name="name"
                    control={form.control}
                    rules={{ required: "El nombre es requerido" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nombre"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="code"
                    control={form.control}
                    rules={{ required: "El código es requerido" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Código"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    rules={{ required: "La descripción es requerida" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Descripción"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="defaultSalePercentage"
                    control={form.control}
                    rules={{
                        required: "El porcentaje de venta es requerido",
                        min: {
                            value: 0,
                            message: "El porcentaje no puede ser negativo",
                        },
                        max: {
                            value: 100,
                            message: "El porcentaje no puede ser mayor a 100",
                        },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Porcentaje de venta por defecto
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Porcentaje de venta por defecto"
                                    {...field}
                                />
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

export default ProductTypeForm;
