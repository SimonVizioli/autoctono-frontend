import { createResource } from "@/utils/service/createResource";

export const LoginApi = createResource("/auth/login");
export const SalesApi = {
    ...createResource("/sales"),
    dto: createResource("/sales/dto"),
};
export const SaleStatusApi = createResource("/sales-status");
export const StockApi = createResource("/stocks");
export const ProductsApi = createResource("/products");
export const ProductsSaleApi = createResource("/product-sale");
export const ProductTypesApi = createResource("/product-types");
export const CustomersApi = createResource("/customers");
