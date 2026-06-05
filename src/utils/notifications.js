export const notifications = {
    show(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transform transition-all duration-300 translate-x-full`;
        
        let iconClass = 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200';
        if (type === 'success') iconClass = 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200';
        if (type === 'error') iconClass = 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200';
        if (type === 'warning') iconClass = 'text-orange-500 bg-orange-100 dark:bg-orange-800 dark:text-orange-200';

        toast.innerHTML = `
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconClass} rounded-lg">
                <span class="sr-only">Icon</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            </div>
            <div class="ms-3 text-sm font-normal">${message}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            </button>
        `;

        container.appendChild(toast);

        // Animación de entrada
        setTimeout(() => toast.classList.remove('translate-x-full'), 10);

        // Auto-remove
        const removeToast = () => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        };

        const timer = setTimeout(removeToast, 5000);

        toast.querySelector('button').onclick = () => {
            clearTimeout(timer);
            removeToast();
        };
    },

    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    warning(message) { this.show(message, 'warning'); },
    info(message) { this.show(message, 'info'); }
};
