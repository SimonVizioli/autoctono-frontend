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
import { ProductTypesApi } from "@/service/api";
import { Product } from "@/types/product";
import { ProductType } from "@/types/productType";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ProductFormProps = {
    onSubmit: (data: Product) => void;
    initialData?: Product;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
    const form = useForm<Product>({
        defaultValues: initialData || {
            detail: "",
            name: "",
            price: 0,
            cost: 0,
            code: "",
            productTypeId: "",
        },
    });

    // Observar cambios en "cost" y "productTypeId"
    const cost = form.watch("cost");
    form.watch("productTypeId");

    // Estado para guardar el tipo de producto seleccionado (asumiendo que incluye defaultSalePercentage)
    const [selectedProductType, setSelectedProductType] =
        useState<ProductType>();
    const [productTypes, setProductTypes] = useState<ProductType[]>();

    const getAllProductTypes = async () => {
        const response = (await ProductTypesApi.get()) as ProductType[];
        setProductTypes(response);
    };

    useEffect(() => {
        getAllProductTypes();
    }, []);

    // Si tu componente SelectTipoProducto solo retorna el ID, deberías buscar
    // el objeto completo (por ejemplo, de un listado de tipos de producto).
    // Aquí, supongamos que el componente puede devolver el objeto completo.
    const handleProductTypeChange = (value: string) => {
        // Si 'value' es un objeto con la info, lo seteamos; de lo contrario, ajusta según tu implementación
        const selected = productTypes?.find((pt) => pt.id == value);
        if (selected) setSelectedProductType(selected);
        form.setValue("productTypeId", value);
    };

    // Actualizar precio dinámicamente al cambiar el costo o el tipo de producto
    // Obtén el porcentaje de venta:
    // Si estás editando, tomamos el valor de initialData;
    // en create, lo obtenemos del tipo de producto seleccionado (o 0 si no está definido).
    useEffect(() => {
        const defaultSalePercentage =
            initialData?.productType?.defaultSalePercentage ||
            selectedProductType?.defaultSalePercentage ||
            0;

        if (cost && !isNaN(Number(cost))) {
            const newPrice =
                parseFloat(cost.toString()) *
                (1 + parseFloat(defaultSalePercentage.toString()) / 100);
            form.setValue("price", newPrice);
        }
    }, [cost, selectedProductType, initialData, form]);

    const handleSubmit = (values: Product) => {
        // Asegúrate de que el precio sea numérico
        values.price = parseFloat(values.price.toString());
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <div className="flex gap-4">
                    {/* Nombre */}
                    <FormField
                        name="name"
                        control={form.control}
                        rules={{ required: "El nombre es requerido" }}
                        render={({ field }) => (
                            <FormItem className="w-full">
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
                    {/* Código */}
                    <FormField
                        name="code"
                        control={form.control}
                        rules={{ required: "El código es requerido" }}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Código</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Código del producto"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* Detalle */}
                <FormField
                    name="detail"
                    control={form.control}
                    rules={{ required: "La descripción es requerida" }}
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
                {/* Categoría */}
                <FormField
                    name="productTypeId"
                    control={form.control}
                    rules={{ required: "La categoría es requerida" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <FormControl>
                                {/* Ajustamos el onChange para obtener el objeto completo o el ID */}
                                <SelectTipoProducto
                                    onChange={(value) => {
                                        handleProductTypeChange(value);
                                        field.onChange(value);
                                    }}
                                    value={field.value.toString()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    {/* Precio */}
                    <FormField
                        name="price"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
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
                                            readOnly
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Costo */}
                    <FormField
                        name="cost"
                        control={form.control}
                        rules={{
                            required: "El costo es requerido",
                            min: {
                                value: 0.01,
                                message: "El costo debe ser mayor que 0",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Costo</FormLabel>
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
                </div>
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

export default ProductForm;
