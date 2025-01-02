// src/components/pages/sales/form.tsx
import SelectCliente from "@/components/clients/select";
import SelectEstado from "@/components/states/select";
import SelectProducto from "@/components/products/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { Sales } from "@/types/sales";
import React, { useEffect } from "react";

const SalesForm: React.FC<{
    onSubmit: (data: Sales) => void;
    initialData?: Sales;
}> = ({ onSubmit, initialData }) => {
    const form = useForm<Sales>({
        defaultValues: initialData || {
            detalle: "",
            total: 0,
            cliente_id: "",
            estado_id: "",
            productos: [],
        },
    });

    const { fields, append, update, remove } = useFieldArray({
        control: form.control,
        name: "productos",
    });

    const totalWatcher = form.watch("productos");

    // Calcular el total dinámicamente basado en los productos
    useEffect(() => {
        const total = totalWatcher.reduce(
            (acc, producto) =>
                acc + (producto.precioUnitario || 0) * (producto.cantidad || 1),
            0
        );
        form.setValue("total", total);
    }, [totalWatcher, form]);

    const handleProductSelection = (
        index: number,
        selectedProduct: { id: string; precio: number }
    ) => {
        update(index, {
            ...fields[index],
            producto_id: selectedProduct.id,
            precioUnitario: selectedProduct.precio,
        });
    };

    const handleAddProduct = () => {
        append({
            producto_id: "",
            precioUnitario: 0,
            cantidad: 1,
        });
    };

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

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Productos</h3>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex items-end space-x-4"
                        >
                            <FormField
                                name={`productos.${index}.producto_id`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Producto</FormLabel>
                                        <FormControl>
                                            <SelectProducto
                                                onChange={(selectedProduct) =>
                                                    handleProductSelection(
                                                        index,
                                                        selectedProduct
                                                    )
                                                }
                                                initialValue={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`productos.${index}.cantidad`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1"
                                                {...field}
                                                onChange={(e) => {
                                                    const newValue =
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        ) || 0;
                                                    field.onChange(newValue); // Notifica el cambio al form
                                                    update(index, {
                                                        ...fields[index],
                                                        cantidad: newValue,
                                                    }); // Actualiza el campo correspondiente
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name={`productos.${index}.precioUnitario`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Precio Unitario</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={`$ ${field.value.toFixed(
                                                    2
                                                )}`}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="secondary"
                        onClick={handleAddProduct}
                        type="button"
                    >
                        Agregar Producto
                    </Button>
                </div>

                <FormField
                    name="total"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    value={`$ ${field.value.toFixed(2)}`}
                                    readOnly
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
