import { DashboardView } from '@/views/DashboardView.js';
import { ProductsView } from '@/views/ProductsView.js';
import { LoginView } from '@/views/LoginView.js';
import { renderNavbar } from '@/main.js';

const routes = {
    '/': DashboardView,
    '/products': ProductsView,
    '/login': LoginView
};

export async function router() {
    const path = window.location.pathname;
    const user = JSON.parse(localStorage.getItem('user'));

    // Redirección si no está logueado
    if (!user && path !== '/login') {
        window.history.pushState({}, '', '/login');
        return router();
    }

    // Redirección si ya está logueado pero va al login
    if (user && path === '/login') {
        window.history.pushState({}, '', '/');
        return router();
    }

    // Renderizar Navbar
    renderNavbar();

    const view = routes[path] || { render: () => '<h1 class="text-4xl font-black text-center mt-20">404 - Not Found</h1>' };
    const main = document.getElementById('main');
    
    // 1. Inyectamos el HTML (Llamamos a render())
    main.innerHTML = await view.render();
    
    // 2. Inicializamos la lógica (Llamamos a init() si existe)
    if (view.init) await view.init();

    updateActiveLinks();
}

function updateActiveLinks() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('bg-indigo-50', 'text-indigo-600', 'dark:bg-indigo-900/30', 'dark:text-indigo-400');
        } else {
            link.classList.remove('bg-indigo-50', 'text-indigo-600', 'dark:bg-indigo-900/30', 'dark:text-indigo-400');
            link.classList.add('text-gray-500', 'hover:bg-gray-50', 'dark:text-gray-400', 'dark:hover:bg-gray-800');
        }
    });
}
