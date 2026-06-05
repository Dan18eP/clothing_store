import { getProducts } from '@/api/client.js';

export const DashboardView = {
    render: async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        try {
            // OPTIMIZACIÓN: Solo pedimos los productos necesarios a la API
            const products = await getProducts(user.role === 'seller' ? user.id : null);

            const stats = {
                total: products.length,
                stock: products.filter(p => p.stock > 0).length,
                out: products.filter(p => p.stock === 0).length,
                low: products.filter(p => p.stock > 0 && p.stock < 10).length
            };

            return `
                <div class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                    <header>
                        <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Panel Principal</h1>
                        <p class="text-gray-500 dark:text-gray-400 mt-2 font-medium">Bienvenido de nuevo, <span class="text-indigo-600 font-bold">${user.name}</span>. Esto es lo que sucede hoy.</p>
                    </header>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${card('Total Productos', stats.total, 'indigo', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')}
                        ${card('En Stock', stats.stock, 'emerald', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')}
                        ${card('Agotados', stats.out, 'rose', 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z')}
                        ${card('Stock Bajo', stats.low, 'amber', 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z')}
                    </div>

                    <div class="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-indigo-500/20">
                        <div>
                            <h2 class="text-2xl font-bold italic">¿Necesitas añadir nueva mercancía?</h2>
                            <p class="text-indigo-100 mt-1 opacity-80">Recuerda que solo los administradores pueden crear nuevos registros.</p>
                        </div>
                        <a href="/products" data-link class="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-colors">IR AL INVENTARIO</a>
                    </div>
                </div>
            `;
        } catch (error) {
            return `
                <div class="text-center py-20">
                    <h2 class="text-2xl font-bold text-red-600">Error al cargar el dashboard</h2>
                    <p class="text-gray-500 mt-2">Por favor, asegúrate de que la API esté encendida.</p>
                    <button onclick="window.location.reload()" class="mt-6 btn btn-primary">Reintentar</button>
                </div>
            `;
        }
    }
};

function card(label, value, color, iconPath) {
    const colors = {
        indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
        emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
        amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
    };

    return `
        <div class="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group">
            <div class="w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"/></svg>
            </div>
            <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">${label}</p>
            <p class="text-4xl font-black text-gray-900 dark:text-white mt-1">${value}</p>
        </div>
    `;
}
