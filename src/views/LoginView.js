import { loginUser } from '@/api/client.js';
import { notifications } from '@/utils/notifications.js';
import { navigateTo } from '@/main.js';

export const LoginView = {
    render: async () => `
        <div class="flex items-center justify-center py-20 px-4">
            <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-12 rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-gray-100 dark:border-gray-800">
                <div class="text-center">
                    <div class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/40">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                    </div>
                    <h2 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Acceso Privado</h2>
                    <p class="text-gray-500 mt-2 font-medium italic">Gestión de Inventario v1.0</p>
                </div>
                <form id="login-form" class="mt-10 space-y-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Email Corporativo</label>
                        <input id="email" type="email" required class="input h-14 px-8 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" placeholder="admin@store.com">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Contraseña</label>
                        <input id="password" type="password" required class="input h-14 px-8 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" placeholder="••••••">
                    </div>
                    <button type="submit" class="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">INGRESAR AL PANEL</button>
                </form>
            </div>
        </div>
    `,

    init: () => {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = await loginUser(email, password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                notifications.success(`Hola de nuevo, ${user.name}`);
                navigateTo('/'); // Navegación limpia
            } else {
                notifications.error('Acceso denegado: Datos incorrectos');
            }
        });
    }
};
