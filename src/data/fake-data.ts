// src/data/fake-data.ts
export const fakeStocks = [
    { id: "1", productoNombre: "Arcilla Roja", cantidad: 150 },
    { id: "2", productoNombre: "Cerámica Blanca", cantidad: 200 },
    { id: "3", productoNombre: "Pintura Acrílica", cantidad: 120 },
];

export const fakeSales = [
    {
        id: "1",
        detalle: "Venta de Arcilla Roja",
        clienteNombre: "Juan Pérez",
        estado: "Finalizada",
        total: 500,
    },
    {
        id: "2",
        detalle: "Venta de Pintura Acrílica",
        clienteNombre: "María López",
        estado: "Pendiente",
        total: 300,
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
