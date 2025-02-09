import { Customer } from "./customer";
import { Product } from "./product";
import { Status } from "./status";

export interface ProductSale {
    id: string;
    saleId: number;
    sale: Sales;
    product: Product;
    quantity: number;
    unitPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductSaleItem {
    productId: string;
    unitPrice: number;
    quantity: number;
}

export interface Sales {
    id: string;
    detail: string;
    total: number;
    customerId: string;
    statusId: string;
    status: Status;
    customer: Customer;
    productId: string;
    products: ProductSaleItem[];
    productSales: ProductSale[];
}
