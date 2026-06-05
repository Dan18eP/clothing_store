import { router } from '@/router/router.js';

// CENTRAL DE NAVEGACIÓN: La única forma de cambiar de página
export function navigateTo(url) {
    window.history.pushState({}, '', url); // 1. Cambiamos la URL
    router();                             // 2. Llamamos al router directamente
}

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

document.addEventListener('DOMContentLoaded', () => {
    // Para las flechas de atrás/adelante sí escuchamos el evento real
    window.addEventListener('popstate', router);
    
    // Delegación de clics para enlaces
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }
    });

    router();
});
