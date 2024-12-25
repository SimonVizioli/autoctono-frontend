import { Inventory } from "@/types/inventory";

// src/data/fake-data.ts
export const fakeStocks = [
    { id: "1", productoNombre: "Arcilla Roja", cantidad: 150 },
    { id: "2", productoNombre: "Cerámica Blanca", cantidad: 200 },
    { id: "3", productoNombre: "Pintura Acrílica", cantidad: 120 },
];

export const fakeInventory: Inventory[] = [
    { id: "1", cantidad: 100, producto: "Arcilla Roja" },
    { id: "2", cantidad: 50, producto: "Pintura Acrílica" },
    { id: "3", cantidad: 25, producto: "Cerámica Blanca" },
];

// src/data/fake-data.ts
export const fakeSales = [
    {
        id: "1",
        detalle: "Venta de arcilla",
        total: 200.0,
        cliente_id: "1",
        estado_id: "3",
    },
    {
        id: "2",
        detalle: "Venta de cerámica",
        total: 500.5,
        cliente_id: "2",
        estado_id: "2",
    },
];

export const fakeCustomers = [
    {
        id: "1",
        razonSocial: "Empresa XYZ",
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@example.com",
    },
    {
        id: "2",
        razonSocial: "Empresa ABC",
        nombre: "María",
        apellido: "López",
        email: "maria.lopez@example.com",
    },
];
