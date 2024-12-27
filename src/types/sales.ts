export interface ProductSale {
    producto_id: string;
    precioUnitario: number;
    detalle?: string;
    tipoProducto_id?: string;
    cantidad?: number;
}

export interface Sales {
    id: string;
    detalle: string;
    total: number;
    cliente_id: string;
    estado_id: string;
    productos: ProductSale[];
}
