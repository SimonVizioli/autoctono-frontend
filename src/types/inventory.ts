import { Product } from "./product";

export interface Inventory {
    id: string;
    quantity: number;
    productId: string;
    product: Product;
}
