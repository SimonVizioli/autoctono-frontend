import { Product } from "./product";

export interface Inventory {
    id: string;
    quantity: number;
    productId: string;
    product: Product;
    unitOfMeasurement: unitOfMeasurement;
}

export enum unitOfMeasurement {
    UNIT = "unit",
    GRAMS = "grams",
}
