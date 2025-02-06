import { Product } from "./product";

export interface ProductoVenta {
    producto_id: string;
    precioUnitario: number;
    detail?: string;
    tipoProducto_id?: string;
    cantidad?: number;
}

export interface Sales {
    id: string;
    detail: string;
    total: number;
    cliente_id: string;
    estado_id: string;
    productos: ProductoVenta[];
}

export interface ProductSale {
    id: string;
    saleId: number;
    sale: Sale;
    product: Product;
    quantity: number;
    unitPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface Sale {
    id: string;
    detail: string;
    total: number;
    customerId: string;
    statusId: string;
    productSales: ProductSale[];
}
