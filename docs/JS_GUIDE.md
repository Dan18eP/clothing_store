# 🚀 GUÍA DEFINITIVA: SPA CON JAVASCRIPT VANILLA (EXAMEN READY)

Esta guía es una herramienta de consulta rápida para el desarrollo de Single Page Applications (SPA) en entornos de examen.

## Tabla de Contenido
1.  [JavaScript Esencial](#1-javascript-esencial)
2.  [DOM](#2-dom)
3.  [Eventos](#3-eventos)
4.  [Fetch API](#4-fetch-api)
5.  [JSON Server](#5-json-server)
6.  [Autenticación](#6-autenticación)
7.  [Roles](#7-roles)
8.  [SPA Routing](#8-spa-routing)
9.  [Guards](#9-guards)
10. [Arquitectura Recomendada](#10-arquitectura-recomendada)
11. [CRUD Completo](#11-crud-completo)
12. [Dashboard](#12-dashboard)
13. [Validaciones](#13-validaciones)
14. [Manejo de Errores](#14-manejo-errores)
15. [Responsive](#15-responsive)
16. [Componentes Reutilizables](#16-componentes-reutilizables)
17. [Preguntas de Examen](#17-preguntas-de-examen)
18. [Errores que Hacen Perder Puntos](#18-errores-que-hacen-perder-puntos)
19. [Orden Óptimo de Resolución](#19-orden-óptimo-para-resolver-la-prueba)
20. [Checklist Final](#20-checklist-final)

---

## 1. JavaScript Esencial
*Lógica pura para manipulación de datos.*

### ¿Cuándo usarlo?
Para transformar datos de la API antes de renderizar o validar entradas.

### Código listo para copiar
```javascript
// Variables y Objetos
const user = { id: 1, name: "Admin", role: "ADMIN" };
let { name, role } = user; // Destructuring

// Arrays y Métodos (El Corazón del CRUD)
const products = [{ id: 1, price: 100 }, { id: 2, price: 200 }];

const names = products.map(p => `Producto: ${p.id}`); // Transformar
const expensive = products.filter(p => p.price > 150); // Filtrar
const found = products.find(p => p.id === 1); // Buscar uno
const total = products.reduce((acc, p) => acc + p.price, 0); // Sumar todo

// Spread Operator (Clonar sin referenciar)
const updatedUser = { ...user, name: "Nuevo Nombre" };
const moreProducts = [...products, { id: 3, price: 300 }];

// Template Literals
const html = `<div class="${role.toLowerCase()}">${name}</div>`;
```

### Errores comunes
*   Usar `==` en lugar de `===`.
*   Olvidar el `return` en `map` o `filter` si usas llaves `{}`.
*   Modificar el array original en lugar de usar métodos inmutables.

---

## 2. DOM
*Manipulación de la interfaz.*

### ¿Cuándo usarlo?
Para inyectar HTML dinámico, limpiar vistas o cambiar estilos.

### Patrón de Renderizado Dinámico
```javascript
const container = document.querySelector('#app');

// Limpiar y renderizar
export function renderList(data) {
    container.innerHTML = ''; // Importante: limpiar antes de pintar
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card p-4 border rounded';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <button class="btn-delete" data-id="${item.id}">Eliminar</button>
        `;
        container.appendChild(card);
    });
}
```

### Checklist
- [ ] ¿Usé `querySelector` correctamente?
- [ ] ¿Limpié el contenedor antes de renderizar?
- [ ] ¿Usé `classList.add/remove` para estilos?

---

## 3. Eventos
*Interacción del usuario.*

### Event Delegation (El Patrón Pro)
En lugar de poner un evento a cada botón, ponlo al padre.
```javascript
document.querySelector('#container').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id; // Leer data-id
        handleDelete(id);
    }
});

// Formulario
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault(); // ¡OBLIGATORIO!
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
});
```

---

## 4. Fetch API
*Comunicación con el servidor.*

### Chuleta de Métodos
| Método | Uso | Body |
| :--- | :--- | :--- |
| **GET** | Obtener | No |
| **POST** | Crear | Sí |
| **PUT** | Reemplazar | Sí |
| **PATCH** | Editar parcial | Sí |
| **DELETE** | Eliminar | No |

### Estructura Profesional
```javascript
const API_URL = 'http://localhost:3000';

const api = {
    get: (path) => fetch(`${API_URL}${path}`).then(res => res.json()),
    post: (path, data) => fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    // Repetir para PUT, PATCH, DELETE...
};
```

---

## 5. JSON Server
*Tu base de datos falsa.*

### Comandos
```bash
# Instalación
npm install -g json-server
# Ejecución (el archivo db.json debe existir)
json-server --watch db.json --port 3000
```

### Endpoints Útiles
- `GET /users?role=ADMIN` (Filtrado)
- `GET /posts?_expand=user` (Relación: trae el usuario del post)
- `GET /users?q=searchterm` (Búsqueda global)

### Cómo usar `_expand` en el Frontend
Si pides `GET /tasks?_expand=user`, JSON Server te devuelve esto:
```json
{
  "id": 1,
  "title": "Tarea 1",
  "userId": 2,
  "user": {
    "id": 2,
    "name": "Pepito",
    "role": "ADMIN"
  }
}
```

**Para mostrarlo en tu tabla/card:**
```javascript
// Al renderizar, accedes mediante el nombre del recurso en singular
function renderTasks(tasks) {
    const html = tasks.map(task => `
        <tr>
            <td>${task.title}</td>
            <!-- Acceso a la relación expandida -->
            <td>${task.user ? task.user.name : 'Sin asignar'}</td>
            <td>${task.user ? task.user.role : 'N/A'}</td>
        </tr>
    `).join('');
    document.querySelector('#table-body').innerHTML = html;
}
```
> **Tip de Examen:** Siempre verifica si `task.user` existe antes de acceder a `task.user.name` para evitar errores de "cannot read property of undefined" si un registro no tiene relación.

---

## 6. Autenticación
*Control de acceso.*

### Flujo de Login
```javascript
async function login(email, password) {
    const users = await api.get(`/users?email=${email}&password=${password}`);
    if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        window.location.hash = '#/dashboard';
    } else {
        alert('Credenciales incorrectas');
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.hash = '#/login';
}
```

---

## 7. Roles
*Permisos.*

### Ocultar botones según Rol
```javascript
function renderActions(item) {
    const user = JSON.parse(localStorage.getItem('user'));
    return `
        <button onclick="view(${item.id})">Ver</button>
        ${user.role === 'ADMIN' ? `<button onclick="edit(${item.id})">Editar</button>` : ''}
    `;
}
```

---

## 8. SPA Routing
*Navegación sin recargar.*

### Router Mínimo
```javascript
const routes = {
    '#/login': LoginView,
    '#/dashboard': DashboardView,
    '#/404': NotFoundView
};

async function router() {
    const hash = window.location.hash || '#/login';
    const view = routes[hash] || routes['#/404'];
    
    // Ejecutar Guard antes de renderizar
    if (hash === '#/dashboard' && !localStorage.getItem('user')) {
        window.location.hash = '#/login';
        return;
    }

    document.querySelector('#app').innerHTML = await view();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
```

---

## 9. Guards
*Protección de rutas.*

```javascript
const AuthGuard = () => !!localStorage.getItem('user');
const AdminGuard = () => JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN';

// Uso en el router
if (route.protected && !AuthGuard()) {
    window.location.hash = '#/login';
}
```

---

## 10. Arquitectura Recomendada
- `src/api/`: Servicios fetch.
- `src/auth/`: Lógica de login/logout.
- `src/router/`: Configuración de rutas.
- `src/views/`: Funciones que retornan HTML.
- `src/components/`: HTML pequeño reutilizable (nav, table).
- `src/guards/`: Funciones booleanas de protección.
- `src/utils/`: Validadores, formateadores de fecha.
- `main.js`: Punto de entrada (event listeners globales).

---

## 11. CRUD Completo
*Implementación robusta paso a paso.*

### Diagrama de Flujo
```text
Formulario (HTML) 
    ↓ [Evento: submit]
Controlador (JavaScript) 
    ↓ [Validación + Object.fromEntries]
Servicio (API Fetch) 
    ↓ [Petición: POST/PUT]
Respuesta (JSON) 
    ↓ [Cerrar Modal + Feedback]
Renderizado (UI)
```

### Implementación Realista
```javascript
// 1. EL SERVICIO (api.js)
export const api = {
    create: (data) => fetch('.../tasks', { 
        method: 'POST', body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    }),
    update: (id, data) => fetch(`.../tasks/${id}`, { 
        method: 'PUT', body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    }),
    delete: (id) => fetch(`.../tasks/${id}`, { method: 'DELETE' })
};

// 2. LA VISTA Y LÓGICA (tasks.js)
export async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const id = e.target.dataset.id; // Si hay ID, es edición

    try {
        if (id) {
            await api.update(id, data);
            showToast('Actualizado con éxito');
        } else {
            await api.create(data);
            showToast('Creado con éxito');
        }
        closeModal();
        renderList(); // Refrescar UI
    } catch (err) {
        showToast('Error al guardar', 'error');
    }
}
```

---

## 12. Dashboard
*Métricas rápidas.*

```javascript
const stats = {
    total: data.length,
    active: data.filter(i => i.status === 'active').length,
    pending: data.reduce((acc, i) => i.status === 'pending' ? acc + 1 : acc, 0)
};
```

---

## 13. Validaciones
```javascript
const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Min 8, 1 letra, 1 num
};

if (!regex.email.test(email)) alert('Email inválido');
```

---

## 14. Manejo de Errores
```javascript
async function safeFetch(fn) {
    try {
        const response = await fn();
        if (!response.ok) throw new Error('Error en servidor');
        return await response.json();
    } catch (err) {
        console.error(err);
        showToast('Algo salió mal');
    }
}
```

---

## 15. Responsive (Tailwind Cheat Sheet)
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-4`
- **Flex:** `flex flex-col sm:flex-row justify-between items-center`
- **Hidden:** `hidden md:block` (ocultar en móvil, mostrar en tablet/pc)
- **Padding/Margin:** `p-4 m-2`, `px-6 py-2`

---

## 16. Componentes Reutilizables (Tailwind)

### Sidebar (Responsive)
```html
<aside class="w-64 bg-gray-800 text-white h-screen fixed md:relative hidden md:block">
    <div class="p-4 text-xl font-bold border-b border-gray-700">Menú</div>
    <nav class="mt-4">
        <a href="#/dashboard" class="block py-2.5 px-4 hover:bg-gray-700 transition">Dashboard</a>
        <a href="#/users" class="block py-2.5 px-4 hover:bg-gray-700 transition">Usuarios</a>
        <a href="#/settings" class="block py-2.5 px-4 hover:bg-gray-700 transition">Ajustes</a>
    </nav>
</aside>
```

### Data Table
```html
<div class="overflow-x-auto">
    <table class="min-w-full bg-white border">
        <thead>
            <tr class="bg-gray-100 text-gray-600 uppercase text-sm">
                <th class="py-3 px-6 text-left">ID</th>
                <th class="py-3 px-6 text-left">Nombre</th>
                <th class="py-3 px-6 text-center">Estado</th>
                <th class="py-3 px-6 text-center">Acciones</th>
            </tr>
        </thead>
        <tbody id="table-body">
            <!-- Render dinámico aquí -->
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-6">1</td>
                <td class="py-3 px-6">Ejemplo</td>
                <td class="py-3 px-6 text-center">
                    <span class="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">Activo</span>
                </td>
                <td class="py-3 px-6 text-center space-x-2">
                    <button class="text-blue-500 hover:text-blue-700">Edit</button>
                    <button class="text-red-500 hover:text-red-700">Del</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### Toast (Notificación)
```javascript
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    toast.className = `fixed bottom-4 right-4 ${color} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
```

### Loader (Spinner)
```html
<div id="loader" class="flex justify-center items-center py-10 hidden">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>
```

### Search Bar & Filters
```html
<div class="flex flex-col md:flex-row gap-4 mb-6">
    <input type="text" id="search" placeholder="Buscar..." class="border p-2 rounded w-full md:w-1/2">
    <select id="filter" class="border p-2 rounded w-full md:w-1/4">
        <option value="">Todos los estados</option>
        <option value="active">Activos</option>
        <option value="pending">Pendientes</option>
    </select>
</div>
```

### Badges & Status
```html
<span class="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-800">Completado</span>
<span class="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">Pendiente</span>
<span class="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-800">Cancelado</span>
```

### Empty State
```html
<div class="flex flex-col items-center justify-center py-20 text-gray-500">
    <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <p class="text-xl">No se encontraron resultados</p>
</div>
```

### Vistas de Error (404 & 403)
```html
<!-- 404 Not Found -->
<div class="text-center py-20">
    <h1 class="text-6xl font-bold text-blue-600">404</h1>
    <p class="text-2xl mt-4">Página no encontrada</p>
    <a href="#/dashboard" class="text-blue-500 underline mt-4 inline-block">Volver al inicio</a>
</div>

<!-- 403 Forbidden -->
<div class="text-center py-20">
    <h1 class="text-6xl font-bold text-red-600">403</h1>
    <p class="text-2xl mt-4">Acceso Denegado</p>
    <p class="text-gray-500">No tienes permisos para ver esta sección.</p>
</div>
```

---

## 17. Preguntas de Examen

### 20 Preguntas Teóricas
1. **¿Qué es una SPA?** Aplicación que carga una sola página HTML y actualiza el contenido dinámicamente.
2. **¿Diferencia entre `let` y `const`?** `let` permite reasignar el valor, `const` no.
3. **¿Qué es el Event Delegation?** Poner un listener en un ancestro para manejar eventos de sus hijos.
4. **¿Qué hace `Object.fromEntries(formData)`?** Convierte los datos de un formulario en un objeto JS.
5. **¿Qué significa que Fetch es asíncrono?** Que no bloquea la ejecución mientras espera la respuesta del servidor.
6. **¿Para qué sirve el `localStorage`?** Para persistir datos en el navegador de forma permanente (hasta ser borrados).
7. **¿Qué es un 'Guard' en una SPA?** Una función que verifica permisos antes de permitir el acceso a una ruta.
8. **¿Qué hace `JSON.parse()`?** Convierte un string JSON en un objeto de JavaScript.
9. **¿Qué es el `hashchange`?** Evento que se dispara cuando cambia la parte del URL después del `#`.
10. **¿Para qué sirve `e.target`?** Hace referencia al elemento exacto que disparó el evento.
11. **¿Diferencia entre `innerHTML` y `textContent`?** `innerHTML` procesa HTML, `textContent` solo texto plano (más seguro).
12. **¿Qué es el 'State' en una app?** La fuente de verdad de los datos en un momento dado.
13. **¿Qué hace `array.map()`?** Crea un nuevo array transformando cada elemento del original.
14. **¿Qué hace `array.filter()`?** Crea un nuevo array solo con los elementos que cumplen una condición.
15. **¿Qué es un 'Callback'?** Una función pasada como argumento a otra función para ser ejecutada después.
16. **¿Qué es el `Spread Operator` (...)?** Permite copiar propiedades de objetos o elementos de arrays.
17. **¿Para qué sirve `await`?** Para esperar a que una promesa se resuelva antes de seguir con el código.
18. **¿Qué es un 'Template Literal'?** Strings delimitados por `` ` `` que permiten interpolación de variables `${}`.
19. **¿Qué significa 'Side Effect'?** Cualquier cambio de estado o interacción con el mundo exterior fuera de una función.
20. **¿Por qué usar módulos (`export/import`)?** Para organizar el código en archivos independientes y reutilizables.

### 20 Ejercicios Prácticos
1. **Sumar precios:** `products.reduce((acc, p) => acc + p.price, 0)`.
2. **Filtrar por rol:** `users.filter(u => u.role === 'ADMIN')`.
3. **Obtener ID de dataset:** `const id = e.target.dataset.id`.
4. **Limpiar contenedor:** `container.innerHTML = ''`.
5. **Redirección manual:** `window.location.hash = '#/home'`.
6. **Guardar usuario:** `localStorage.setItem('user', JSON.stringify(data))`.
7. **Cerrar sesión:** `localStorage.removeItem('user')`.
8. **Clonar objeto:** `const newObj = { ...oldObj }`.
9. **Crear elemento:** `const div = document.createElement('div')`.
10. **Añadir clase:** `element.classList.add('active')`.
11. **Quitar clase:** `element.classList.remove('hidden')`.
12. **Comprobar si existe clase:** `element.classList.contains('error')`.
13. **Obtener valor de input:** `document.querySelector('#email').value`.
14. **Formatear moneda:** `new Intl.NumberFormat('es-CO').format(price)`.
15. **Buscar elemento único:** `const user = users.find(u => u.id === targetId)`.
16. **Convertir FormData a objeto:** `Object.fromEntries(new FormData(form))`.
17. **Prevenir submit:** `e.preventDefault()`.
18. **Llamar a una API:** `fetch(url).then(r => r.json())`.
19. **Concatenar arrays:** `const all = [...arr1, ...arr2]`.
20. **Validar email:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)`.

---

## 18. Errores que Hacen Perder Puntos
1.  ❌ Olvidar `e.preventDefault()` en el `submit`.
2.  ❌ No usar `await` en llamadas `fetch`.
3.  ❌ Olvidar `JSON.stringify` al guardar en `localStorage`.
4.  ❌ Olvidar `JSON.parse` al leer de `localStorage`.
5.  ❌ No limpiar el contenedor (`innerHTML = ''`) antes de pintar.
6.  ❌ Repetir IDs en el HTML dinámico.
7.  ❌ Dejar `console.log()` en la entrega final.
8.  ❌ No manejar el error 404 (página no encontrada).
9.  ❌ Permitir acceso a rutas protegidas sin login.
10. ❌ No validar campos obligatorios antes de enviar.
11. ❌ Usar `var` en lugar de `let` o `const`.
12. ❌ No usar módulos (`import/export`) si la prueba lo pide.
13. ❌ Dejar el `db.json` vacío o sin datos de prueba.
14. ❌ No poner el atributo `name` en los inputs del formulario.
15. ❌ Olvidar el `method: 'POST'` en el fetch de creación.
16. ❌ Enviar el body en un `GET` o `DELETE`.
17. ❌ No convertir el body a string (`JSON.stringify(data)`).
18. ❌ Olvidar los headers `{ 'Content-Type': 'application/json' }`.
19. ❌ No manejar el `catch` en promesas o usar `try/catch`.
20. ❌ Poner lógica de negocio dentro de una función de renderizado.
21. ❌ Usar selectores demasiado genéricos que colisionan.
22. ❌ No actualizar la UI tras un DELETE exitoso.
23. ❌ Olvidar el `#` en los enlaces del router.
24. ❌ No poner el `type="button"` en botones que no deben hacer submit.
25. ❌ Escribir mal el nombre de una propiedad de la API (case sensitive).
26. ❌ No manejar el estado de "Cargando..." (Loader).
27. ❌ No mostrar mensajes de confirmación tras acciones críticas.
28. ❌ Usar `==` en lugar de `===` para comparaciones.
29. ❌ No ser consistente con el idioma de las variables.
30. ❌ Tener código comentado y sin uso.
31. ❌ No indentar el código (formato sucio).
32. ❌ Usar nombres de variables no descriptivos (`a`, `b`, `data1`).
33. ❌ No cerrar los modales tras guardar.
34. ❌ No resetear el formulario (`form.reset()`).
35. ❌ Hacer múltiples fetch innecesarios en bucle.
36. ❌ No usar `dataset` para pasar IDs en botones.
37. ❌ Mezclar CSS inline con clases de Tailwind/Bootstrap.
38. ❌ No manejar el caso de "No hay resultados" en una lista.
39. ❌ Olvidar actualizar el total de un dashboard tras un cambio.
40. ❌ No poner `alt` en las imágenes.
41. ❌ Usar `alert()` excesivamente en lugar de feedback visual.
42. ❌ No probar la app en diferentes tamaños de pantalla.
43. ❌ Olvidar configurar el puerto correcto de `json-server`.
44. ❌ Tener funciones demasiado largas (más de 50 líneas).
45. ❌ No usar `destructuring` para limpiar el código.
46. ❌ No documentar brevemente funciones complejas.
47. ❌ Dejar contraseñas en texto plano en el código.
48. ❌ No usar `template literals` para HTML dinámico.
49. ❌ No manejar el evento `hashchange` en el router.
50. ❌ No verificar si el usuario tiene el ROL adecuado para una acción.
51. ❌ Olvidar llamar a la función `router()` en el evento `load`.
