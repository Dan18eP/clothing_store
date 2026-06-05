const API_URL = 'http://localhost:3002';

/**
 * Función centralizada para manejar errores de respuesta HTTP
 */
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }
    return await response.json();
}

// OBTENER PRODUCTOS (Optimizado con _expand y filtrado por servidor)
export async function getProducts(userId = null) {
    try {
        const url = userId 
            ? `${API_URL}/products?userId=${userId}&_expand=user`
            : `${API_URL}/products?_expand=user`;
            
        const response = await fetch(url);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

// LOGIN DE USUARIO
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
        const users = await handleResponse(response);
        return users[0] || null;
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}

// CREAR PRODUCTO
export async function createProduct(product) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...product, createdAt: new Date().toISOString() })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
}

// ACTUALIZAR PRODUCTO (PUT)
export async function updateProduct(id, product) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
}

// ELIMINAR PRODUCTO
export async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('No se pudo eliminar el producto');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}
