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
import { ProductSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {
            name: "",
            code: "",
            description: "",
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
