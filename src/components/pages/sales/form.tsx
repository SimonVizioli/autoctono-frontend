import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

// Componentes UI
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

// Tus selects
import SelectCliente from "@/components/clients/select";
import SelectEstado from "@/components/states/select";
import SelectProducto from "@/components/products/select";

// Tipos que representan la data final que quieres enviar
interface ProductFormData {
    productId: string;
    unitPrice: number;
    quantity: number;
}

interface SaleFormData {
    detail: string;
    total: number;
    customerId: string;
    statusId: string;
    products: ProductFormData[];
}

// Props del componente
const SalesForm: React.FC<{
    onSubmit: (data: SaleFormData) => void;
    initialData?: SaleFormData;
}> = ({ onSubmit, initialData }) => {
    // useForm con campos renombrados al formato final
    const form = useForm<SaleFormData>({
        defaultValues: initialData || {
            detail: "",
            total: 0,
            customerId: "",
            statusId: "",
            products: [],
        },
    });

    // useFieldArray para la lista de productos
    const { fields, append, update, remove } = useFieldArray({
        control: form.control,
        name: "products",
    });

    // Escuchamos los productos para recalcular el total automáticamente
    const productsWatcher = form.watch("products");

    useEffect(() => {
        const newTotal = productsWatcher.reduce(
            (acc, item) => acc + (item.unitPrice || 0) * (item.quantity || 1),
            0
        );
        form.setValue("total", newTotal);
    }, [productsWatcher, form]);

    /**
     * Cuando seleccionas un producto en <SelectProducto>:
     *  - Asignamos su `productId`
     *  - Asignamos su `unitPrice` (basado en la lógica que necesites)
     */
    const handleProductSelection = (
        index: number,
        selectedProduct: { id: string; unitPrice: number }
    ) => {
        update(index, {
            ...fields[index],
            productId: selectedProduct.id,
            unitPrice: selectedProduct.unitPrice,
        });
    };

    /**
     * Agregar un nuevo producto (fila) al array
     */
    const handleAddProduct = () => {
        append({
            productId: "",
            unitPrice: 0,
            quantity: 1,
        });
    };

    /**
     * Al enviar el formulario, simplemente despachamos la data
     */
    const handleSubmit = (values: SaleFormData) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {/* Campo detail */}
                <FormField
                    name="detail"
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

                {/* Campo customerId */}
                <FormField
                    name="customerId"
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

                {/* Campo statusId */}
                <FormField
                    name="statusId"
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

                {/* Lista de productos */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Productos</h3>

                    {fields.map((fieldItem, index) => (
                        <div
                            key={fieldItem.id}
                            className="flex items-end space-x-4"
                        >
                            {/* productId */}
                            <FormField
                                name={`products.${index}.productId`}
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

                            {/* quantity */}
                            <FormField
                                name={`products.${index}.quantity`}
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

                            {/* unitPrice */}
                            <FormField
                                name={`products.${index}.unitPrice`}
                                control={form.control}
                                render={({ field }) => {
                                    console.log("field", field);
                                    return (
                                        <FormItem className="flex-1">
                                            <FormLabel>
                                                Precio Unitario
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    value={`$ ${field.value}`}
                                                    readOnly
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
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

                {/* total */}
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
