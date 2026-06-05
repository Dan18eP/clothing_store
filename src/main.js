import { router } from '@/router/router.js';

// 1. Definimos la estructura base de la aplicación (Skeleton)
function AppLayout() {
    return `
        <div id="layout" class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <!-- Navbar inyectada dinámicamente -->
            <header id="header"></header>
            
            <!-- Contenido principal -->
            <main id="main" class="flex-grow container mx-auto px-6 py-10"></main>

            <!-- Footer fijo -->
            <footer class="py-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">&copy; 2024 StorePro Inventory — Premium Management</p>
            </footer>

            <!-- Elementos Globales -->
            <div id="toast-container" class="fixed top-6 right-6 z-50 space-y-3"></div>
            <div id="loader" class="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hidden">
                <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    `;
}

// 2. Central de Navegación
export function navigateTo(url) {
    window.history.pushState({}, '', url);
    router();
}

// 3. Renderizado de Navbar
export function renderNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const header = document.getElementById('header');
    
    if (!user) {
        header.innerHTML = '';
        return;
    }

    header.innerHTML = `
        <nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
            <div class="container mx-auto px-6 h-20 flex items-center justify-between">
                <div class="flex items-center gap-10">
                    <div class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <span class="text-xl font-black tracking-tight text-gray-900 dark:text-white">STORE<span class="text-indigo-600">PRO</span></span>
                    </div>
                    <div class="hidden md:flex items-center gap-1">
                        <a href="/" data-link class="nav-link px-4 py-2 rounded-lg text-sm font-semibold transition-all">Dashboard</a>
                        <a href="/products" data-link class="nav-link px-4 py-2 rounded-lg text-sm font-semibold transition-all">Inventario</a>
                    </div>
                </div>
                
                <div class="flex items-center gap-6">
                    <button id="theme-btn" class="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">🌓</button>
                    <div class="h-10 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <div class="flex items-center gap-3">
                        <div class="text-right hidden sm:block">
                            <p class="text-sm font-bold text-gray-900 dark:text-white leading-none">${user.name}</p>
                            <p class="text-[10px] font-black uppercase tracking-wider text-indigo-500 mt-1">${user.role}</p>
                        </div>
                        <button id="logout-btn" class="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        navigateTo('/login');
    });

    document.getElementById('theme-btn').addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// 4. Inicialización
function init() {
    // Inyectamos el esqueleto dentro de #app
    document.getElementById('app').innerHTML = AppLayout();

    window.addEventListener('popstate', router);
    
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }
    });

    router();
}

document.addEventListener('DOMContentLoaded', init);
