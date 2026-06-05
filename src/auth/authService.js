import { store } from '@/services/store.js';

const API_URL = 'http://localhost:3002';

export const authService = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
            const users = await response.json();

            if (users.length > 0) {
                const user = users[0];
                store.setUser(user);
                return { success: true, user };
            } else {
                return { success: false, message: 'Credenciales inválidas' };
            }
        } catch (error) {
            console.error('Error in login:', error);
            return { success: false, message: 'Error de conexión con el servidor' };
        }
    },

    logout() {
        store.setUser(null);
        window.location.href = '/login';
    }
};
