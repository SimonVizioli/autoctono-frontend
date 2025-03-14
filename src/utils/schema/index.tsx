import { unitOfMeasurement } from "@/types/inventory";
import { IVAValues } from "@/types/sales";
import * as z from "zod";

export const SalesSchema = z.object({
    detail: z.string().min(1, "El detalle es requerido"),
    customerId: z.string().min(1, "Debe seleccionar un cliente"),
    statusId: z.string().min(1, "Debe seleccionar un estado"),
    // Usamos z.nativeEnum para validar que el IVA pertenezca a IVAValues
    iva: z.nativeEnum(IVAValues, {
        errorMap: () => ({ message: "Debes seleccionar un valor de IVA" }),
    }),
    total: z.number().min(0, "El total debe ser mayor o igual a 0"),
    products: z
        .array(
            z.object({
                productId: z.string().min(1, "Debe seleccionar un producto"),
                unitPrice: z
                    .number()
                    .min(0.01, "El precio unitario debe ser mayor que 0"),
                quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
                percentageDiscount: z
                    .number()
                    .min(0, "El descuento no puede ser negativo"),
            })
        )
        .min(1, "Debe haber al menos un producto"),
});

export const InventorySchema = z.object({
    product: z.object({
        id: z.string().min(1, "Debe seleccionar un producto"),
    }),
    quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
    unitOfMeasurement: z.nativeEnum(unitOfMeasurement, {
        errorMap: () => ({ message: "Debe seleccionar una unidad de medida" }),
    }),
});

export const CustomerSchema = z.object({
    companyName: z.string().min(1, "Razón Social es demasiado corto"),
    firstName: z.string().min(1, "Nombre es demasiado corto"),
    lastName: z.string().min(1, "Apellido es demasiado corto"),
    email: z.string().email(),
    cuit: z
        .string()
        .min(11, { message: "CUIT es demasiado corto" })
        .max(11, { message: "CUIT es demasiado largo" }),
    contactNumber: z
        .string({
            required_error: "Campo requerido",
            invalid_type_error: "Número de contacto debe ser un número",
        })
        .min(7, { message: "Número de contacto es demasiado corto" })
        .max(12, { message: "Número de contacto es demasiado largo" }),
});

export const StatusSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    code: z.string().min(1, "El código es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
});

export const ProductTypeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "El nombre es requerido"),
    code: z.string().min(1, "El código es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    defaultSalePercentage: z.coerce
        .number({
            invalid_type_error: "El porcentaje debe ser un número",
        })
        .min(0, "El porcentaje no puede ser negativo")
        .max(100, "El porcentaje no puede ser mayor a 100"),
});

export const ProductSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    code: z.string(),
    detail: z.string(),
    productTypeId: z.string().min(1, "Debe seleccionar una categoría"),
    // Usamos z.coerce para convertir el valor del input (string) a número
    price: z.coerce.number().min(0.01, "El precio debe ser mayor que 0"),
    cost: z.coerce.number().min(0.01, "El costo debe ser mayor que 0"),
});
