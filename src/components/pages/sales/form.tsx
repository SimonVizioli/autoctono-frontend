import React, { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

// Componentes UI
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
import { Trash } from "lucide-react";

// Tus selects
import SelectCliente from "@/components/customers/select";
import SelectProducto from "@/components/products/select";
import SelectEstado from "@/components/states/select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { IVAValues, Sales } from "@/types/sales";

const SalesForm: React.FC<{
    onSubmit: (data: Sales) => void;
    initialData?: Sales;
}> = ({ onSubmit, initialData }) => {
    const form = useForm<Sales>({
        defaultValues: initialData
            ? {
                  ...initialData,
                  products:
                      initialData.productSales?.map((ps) => ({
                          productId: ps.product.id,
                          unitPrice: ps.unitPrice,
                          quantity: ps.quantity,
                          percentageDiscount: ps.percentageDiscount,
                      })) || [],
              }
            : {
                  detail: "",
                  total: 0,
                  customerId: "",
                  statusId: "",
                  iva: IVAValues.TWENTYONE,
                  products: [],
              },
    });

    // useFieldArray para la lista de productos
    const { fields, append, update, remove } = useFieldArray({
        control: form.control,
        name: "products",
        keyName: "__fieldId",
    });

    // Observar los productos para recalcular el total automáticamente
    const productsWatcher = useWatch({
        control: form.control,
        name: "products",
    });

    useEffect(() => {
        const products = Array.isArray(productsWatcher) ? productsWatcher : [];
        const newTotal = products.reduce(
            (acc, item) => acc + (item.unitPrice || 0) * (item.quantity || 1),
            0
        );
        form.setValue("total", newTotal);
    }, [productsWatcher, form]);

    // Cuando se selecciona un producto en <SelectProducto>
    const handleProductSelection = (
        index: number,
        selectedProduct: { id: string; price: number }
    ) => {
        update(index, {
            ...fields[index],
            productId: selectedProduct.id,
            unitPrice: selectedProduct.price,
        });
    };

    // Agregar un producto a la lista
    const handleAddProduct = () => {
        append({
            productId: "",
            unitPrice: 0,
            quantity: 1,
            percentageDiscount: 0,
        });
    };

    const handleSubmit = (values: Sales) => {
        if (!values.iva) {
            toast({
                title: "Error",
                description: "Debes seleccionar un valor de IVA.",
                variant: "destructive",
            });
            return;
        }
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {/* Detalle */}
                <FormField
                    name="detail"
                    control={form.control}
                    rules={{ required: "El detalle es requerido" }}
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

                {/* Cliente */}
                <FormField
                    name="customerId"
                    control={form.control}
                    rules={{ required: "Debes seleccionar un cliente" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cliente</FormLabel>
                            <FormControl>
                                <SelectCliente
                                    onChange={field.onChange}
                                    value={field.value.toString()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Estado */}
                <FormField
                    name="statusId"
                    control={form.control}
                    rules={{ required: "Debes seleccionar un estado" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <SelectEstado
                                    onChange={field.onChange}
                                    value={field.value.toString()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Lista de productos */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Productos</h3>

                    {fields.map((fieldItem, index) => (
                        <div
                            key={fieldItem.__fieldId}
                            className="flex items-end space-x-4"
                        >
                            {/* Producto */}
                            <FormField
                                name={`products.${index}.productId`}
                                control={form.control}
                                rules={{
                                    required: "Debes seleccionar un producto",
                                    validate: (value) =>
                                        value
                                            ? true
                                            : "Debes seleccionar un producto",
                                }}
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
                                                value={field.value.toString()}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Cantidad */}
                            <FormField
                                name={`products.${index}.quantity`}
                                control={form.control}
                                rules={{
                                    required: "La cantidad es requerida",
                                    min: {
                                        value: 1,
                                        message:
                                            "La cantidad debe ser al menos 1",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1"
                                                {...field}
                                                onChange={(e) => {
                                                    const newVal =
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        ) || 1;
                                                    field.onChange(newVal);
                                                    update(index, {
                                                        ...fields[index],
                                                        quantity: newVal,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Precio Unitario (read only) */}
                            <FormField
                                name={`products.${index}.unitPrice`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Precio Unitario</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={`$ ${field.value?.toFixed(
                                                    2
                                                )}`}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Descuento (%) */}
                            <FormField
                                name={`products.${index}.percentageDiscount`}
                                control={form.control}
                                rules={{
                                    required: "El descuento es requerido",
                                    min: {
                                        value: 0,
                                        message:
                                            "El descuento no puede ser negativo",
                                    },
                                    max: {
                                        value: 100,
                                        message:
                                            "El descuento no puede ser mayor a 100",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Descuento (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
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

                <div className="flex justify-end gap-2">
                    {/* IVA */}
                    <FormField
                        name="iva"
                        control={form.control}
                        rules={{
                            required: "Debes seleccionar un valor de IVA",
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IVA</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona IVA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(IVAValues).map(
                                                (iva) => (
                                                    <SelectItem
                                                        key={iva}
                                                        value={iva}
                                                    >
                                                        {iva}%
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
                    {/* Total (read only) */}
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

export default SalesForm;
