import api from "./api-client";

interface ApiResource<T> {
    get: (params?: Record<string, unknown>) => Promise<T[]>;
    post: (data: unknown) => Promise<T>;
    put: (id: string | number, data: unknown) => Promise<T>;
    delete: (id: string | number) => Promise<void>;
    putWithBody: (data: unknown) => Promise<T>;
}

export const createResource = <T>(resourcePath: string): ApiResource<T> => ({
    get: async (params) => {
        const response = await api.get<T[]>(resourcePath, { params });
        return response.data;
    },
    post: async (data) => {
        const response = await api.post<T>(resourcePath, data);
        return response.data;
    },
    put: async (id, data) => {
        const response = await api.put<T>(`${resourcePath}/${id}`, data);
        return response.data;
    },
    putWithBody: async (data) => {
        const response = await api.put<T>(`${resourcePath}`, data);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`${resourcePath}/${id}`);
    },
});
