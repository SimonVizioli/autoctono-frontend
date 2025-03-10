import { ProductType } from "./productType";

export interface Product1 {
    id: string;
    codigo: string;
    detail: string;
    name: string;
    price: number;
    costos: number;
    cantidad: number;
    tipoProducto_id: string;
}

export interface Product {
    id: string;
    detail: string;
    name: string;
    price: number;
    code: string;
    cost: number;
    productTypeId: string;
    productType: ProductType;
}
