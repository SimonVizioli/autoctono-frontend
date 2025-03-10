// src/data/fake-data.ts
export const fakeStocks = [
    { id: "1", productoNombre: "Arcilla Roja", cantidad: 150 },
    { id: "2", productoNombre: "Cerámica Blanca", cantidad: 200 },
    { id: "3", productoNombre: "Pintura Acrílica", cantidad: 120 },
];

export const fakeInventory = [
    { id: "1", quantity: 100, product: "Arcilla Roja" },
    { id: "2", quantity: 50, product: "Pintura Acrílica" },
    { id: "3", quantity: 25, product: "Cerámica Blanca" },
];

export const fakeSales = [
    {
        id: "1",
        detail: "Venta de arcilla",
        total: 200.0,
        customerId: "1",
        statusId: "3",
        productos: [
            { producto_id: "1", precioUnitario: 100 },
            { producto_id: "2", precioUnitario: 100 },
        ],
    },
    {
        id: "2",
        detail: "Venta de cerámica",
        total: 500.5,
        cliente_id: "2",
        estado_id: "2",
        productos: [
            { producto_id: "3", precioUnitario: 250 },
            { producto_id: "1", precioUnitario: 250.5 },
        ],
    },
];

export const fakeStatuses = [
    { id: "1", label: "Pendiente" },
    { id: "2", label: "En proceso" },
    { id: "3", label: "Finalizada" },
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
        codigo: "A",
        detail: "Producto de alta calidad",
        name: "Arcilla Premium",
        price: 150.0,
        costos: 100.0,
        cantidad: 10,
        tipoProducto_id: "1",
    },
    {
        id: "2",
        codigo: "P",
        detail: "Pintura acrílica para cerámica",
        name: "Pintura Acrílica",
        price: 250.0,
        costos: 200.0,
        cantidad: 3,
        tipoProducto_id: "2",
    },
    {
        id: "3",
        codigo: "C",
        detail: "Juego de cerámica decorativa",
        name: "Cerámica Decorativa",
        price: 500.0,
        costos: 180.0,
        cantidad: 5,
        tipoProducto_id: "3",
    },
];
