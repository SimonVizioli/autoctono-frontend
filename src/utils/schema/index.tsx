import * as z from "zod";

const campoRequerido = {
    required_error: "Campo requerido",
};

const commonSchema = {
    name: z.string({
        required_error: "Campo requerido",
        invalid_type_error: "Nombre debe ser de tipo texto",
    }),
    code: z.string({ invalid_type_error: "Código debe ser de tipo texto" }),
    description: z.string({
        invalid_type_error: "Descripción debe ser de tipo texto",
    }),
};

export const SalesSchema = z.object({
    detail: z.string(),
    customerId: z.string(campoRequerido),
    statusId: z.string(campoRequerido),
    products: z.array(
        z.object({
            productId: z.string(campoRequerido),
            unitPrice: z.string(campoRequerido),
            quantity: z.string(campoRequerido),
            percentageDiscount: z.string(),
        })
    ),
});

export const InventorySchema = z.object({
    quantiy: z.string(campoRequerido).min(1),
    productId: z.string(campoRequerido),
});

export const CustomerSchema = z.object({
    companyName: z
        .string(campoRequerido)
        .min(1, { message: "Razón Social es demasiado corto" }),
    firstName: z
        .string(campoRequerido)
        .min(1, { message: "Nombre es demasiado corto" }),
    lastName: z
        .string(campoRequerido)
        .min(1, { message: "Apellido es demasiado corto" }),
    email: z.string(campoRequerido).email(),
    cuit: z
        .string(campoRequerido)
        .min(11, { message: "CUIT es demasiado corto" })
        .max(11, { message: "CUIT es demasiado largo" }),
    contactstring: z
        .string({
            required_error: "Campo requerido",
            invalid_type_error: "Número de contacto debe ser un número",
        })
        .min(7, { message: "Número de contacto es demasiado corto" })
        .max(12, { message: "Número de contacto es demasiado largo" }),
});

export const StatusSchema = z.object(commonSchema);

export const ProductTypeSchema = z.object(commonSchema);

export const ProductSchema = z.object({
    detail: z.string(),
    name: z.string({
        required_error: "Campo requerido",
        invalid_type_error: "Nombre debe ser de tipo texto",
    }),
    code: z.string({ invalid_type_error: "Código debe ser de tipo texto" }),
    price: z.string(campoRequerido),
    cost: z.string(campoRequerido),
    productTypeId: z.string(campoRequerido),
});
