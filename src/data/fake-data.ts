import { Inventory } from "@/types/inventory";
import { Sales } from "@/types/sales";

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

export const fakeSales: Sales[] = [
    {
        id: "1",
        detalle: "Venta de arcilla",
        total: 200.0,
        cliente_id: "1",
        estado_id: "3",
        productos: [
            { producto_id: "prod1", precioUnitario: 100 },
            { producto_id: "prod2", precioUnitario: 100 },
        ],
    },
    {
        id: "2",
        detalle: "Venta de cerámica",
        total: 500.5,
        cliente_id: "2",
        estado_id: "2",
        productos: [
            { producto_id: "prod3", precioUnitario: 250 },
            { producto_id: "prod4", precioUnitario: 250.5 },
        ],
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

// src/data/fake-data.ts
export const fakeProducts = [
    {
        id: "1",
        detalle: "Producto de alta calidad",
        nombre: "Arcilla Premium",
        precio: 150.0,
        tipoProducto_id: "1",
    },
    {
        id: "2",
        detalle: "Pintura acrílica para cerámica",
        nombre: "Pintura Acrílica",
        precio: 250.0,
        tipoProducto_id: "2",
    },
    {
        id: "3",
        detalle: "Juego de cerámica decorativa",
        nombre: "Cerámica Decorativa",
        precio: 500.0,
        tipoProducto_id: "3",
    },
];
