import { getProducts, deleteProduct, createProduct, updateProduct } from '@/api/client.js';
import { notifications } from '@/utils/notifications.js';

let data = [];

export const ProductsView = {
    render: async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        try {
            // OPTIMIZACIÓN: Solo pedimos lo que el rol permite ver
            data = await getProducts(user.role === 'seller' ? user.id : null);

            return `
                <div class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 class="text-4xl font-black text-gray-900 dark:text-white">Inventario</h1>
                            <p class="text-gray-500 mt-1 font-medium">Gestiona los productos y el stock disponible.</p>
                        </div>
                        ${user.role === 'admin' ? `
                            <button id="add-btn" class="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                Nuevo Producto
                            </button>
                        ` : ''}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${data.map(p => `
                            <div class="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group relative overflow-hidden">
                                <div class="absolute top-0 right-0 p-6">
                                    <span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-tighter">${p.category}</span>
                                </div>
                                <div class="space-y-4">
                                    <div class="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">${p.name}</h3>
                                        <p class="text-sm text-gray-400 font-medium line-clamp-1">${p.description}</p>
                                    </div>
                                    <div class="flex justify-between items-end border-t border-gray-50 dark:border-gray-700 pt-4">
                                        <div>
                                            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Precio</p>
                                            <p class="text-2xl font-black text-indigo-600">$${p.price}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-bold text-gray-900 dark:text-white">Talla ${p.size}</p>
                                            <p class="text-xs font-medium ${p.stock === 0 ? 'text-red-500' : 'text-emerald-500'} italic">Stock: ${p.stock}</p>
                                        </div>
                                    </div>
                                    <div class="flex gap-3 pt-2">
                                        <button data-action="edit" data-id="${p.id}" class="flex-1 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all">Editar</button>
                                        ${user.role === 'admin' ? `
                                            <button data-action="delete" data-id="${p.id}" class="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-100 transition-all">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            return `
                <div class="text-center py-20">
                    <h2 class="text-2xl font-bold text-red-600">No se pudieron cargar los productos</h2>
                    <p class="text-gray-500 mt-2">Revisa la conexión con el servidor.</p>
                </div>
            `;
        }
    },

    init: () => {
        const container = document.getElementById('main');
        
        container.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const { action, id } = btn.dataset;
            if (action === 'delete') {
                if (confirm('¿Eliminar este producto?')) {
                    await deleteProduct(id);
                    notifications.success('Producto eliminado');
                    reloadView(); // Recarga limpia
                }
            }
            if (action === 'edit') {
                const product = data.find(p => p.id === id);
                showModal(product);
            }
        });

        const addBtn = document.getElementById('add-btn');
        if (addBtn) addBtn.onclick = () => showModal();
    }
};

// Recarga la vista actual llamando al router
async function reloadView() {
    import('@/router/router.js').then(m => m.router());
}

function showModal(product = null) {
    const user = JSON.parse(localStorage.getItem('user'));
    const isEdit = !!product;
    const isAdmin = user.role === 'admin';

    const modalHtml = `
        <div id="modal-backdrop" class="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div class="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl space-y-6">
                <div>
                    <h2 class="text-3xl font-black text-gray-900 dark:text-white">${isEdit ? 'Editar' : 'Nuevo'} Producto</h2>
                    <p class="text-gray-500 font-medium">Completa la información del inventario.</p>
                </div>
                <form id="product-form" class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Nombre del producto</label>
                        <input name="name" value="${product?.name || ''}" class="input mt-1 h-14 px-6 rounded-2xl" ${!isAdmin && isEdit ? 'disabled' : 'required'}>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Categoría</label>
                        <input name="category" value="${product?.category || ''}" class="input mt-1 h-14 px-6 rounded-2xl" ${!isAdmin && isEdit ? 'disabled' : 'required'}>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Talla</label>
                        <select name="size" class="input mt-1 h-14 px-6 rounded-2xl" ${!isAdmin && isEdit ? 'disabled' : 'required'}>
                            <option value="S" ${product?.size === 'S' ? 'selected' : ''}>S</option>
                            <option value="M" ${product?.size === 'M' ? 'selected' : ''}>M</option>
                            <option value="L" ${product?.size === 'L' ? 'selected' : ''}>L</option>
                            <option value="XL" ${product?.size === 'XL' ? 'selected' : ''}>XL</option>
                            <option value="Única" ${product?.size === 'Única' ? 'selected' : ''}>Única</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Precio ($)</label>
                        <input name="price" type="number" step="0.01" value="${product?.price || ''}" class="input mt-1 h-14 px-6 rounded-2xl" ${!isAdmin && isEdit ? 'disabled' : 'required'}>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Stock Actual</label>
                        <input name="stock" type="number" value="${product?.stock || ''}" class="input mt-1 h-14 px-6 rounded-2xl" required>
                    </div>
                    <div class="col-span-2">
                        <label class="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Responsable Asignado</label>
                        <select name="userId" class="input mt-1 h-14 px-6 rounded-2xl" ${!isAdmin ? 'disabled' : 'required'}>
                            <option value="1" ${product?.userId === '1' ? 'selected' : ''}>Administrador</option>
                            <option value="2" ${product?.userId === '2' ? 'selected' : ''}>Vendedor</option>
                        </select>
                    </div>
                    <div class="col-span-2 flex gap-3 pt-4">
                        <button type="button" id="cancel-modal" class="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                        <button type="submit" class="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('cancel-modal').onclick = () => document.getElementById('modal-backdrop').remove();

    document.getElementById('product-form').onsubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newData = Object.fromEntries(fd.entries());
        
        const final = isEdit ? { ...product, ...newData } : newData;
        final.price = parseFloat(final.price);
        final.stock = parseInt(final.stock);

        if (isEdit) await updateProduct(product.id, final);
        else await createProduct(final);

        document.getElementById('modal-backdrop').remove();
        notifications.success('Guardado');
        reloadView();
    };
}
