import { apiClient } from '@/api/client.js';

export const productService = {
    getAll() {
        return apiClient.get('/products');
    },

    getById(id) {
        return apiClient.get(`/products/${id}`);
    },

    create(product) {
        return apiClient.post('/products', {
            ...product,
            createdAt: new Date().toISOString()
        });
    },

    update(id, product) {
        return apiClient.put(`/products/${id}`, product);
    },

    patch(id, partialProduct) {
        return apiClient.patch(`/products/${id}`, partialProduct);
    },

    delete(id) {
        return apiClient.delete(`/products/${id}`);
    },

    getByResponsable(name) {
        return apiClient.get(`/products?responsable=${name}`);
    }
};
