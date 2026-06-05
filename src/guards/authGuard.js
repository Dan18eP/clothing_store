import { store } from '@/services/store.js';

/**
 * Verifica si el usuario puede acceder a la ruta solicitada.
 * Redirige si no tiene permisos.
 */
export async function authGuard(route) {
    const isAuthenticated = store.isAuthenticated();
    const userRole = store.getRole();

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (route.requiresAuth && !isAuthenticated) {
        history.replaceState(null, null, '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return false;
    }

    // Si el usuario ya está autenticado e intenta ir al login
    if (route.path === '/login' && isAuthenticated) {
        history.replaceState(null, null, '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return false;
    }

    // Verificar roles si la ruta tiene restricciones de rol
    if (route.roles && !route.roles.includes(userRole)) {
        console.warn(`Acceso denegado: el rol ${userRole} no tiene permiso para ${route.path}`);
        history.replaceState(null, null, '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return false;
    }

    return true;
}
