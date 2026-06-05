Actúa como un Senior Frontend Developer especializado en JavaScript Vanilla, arquitectura SPA y consumo de APIs REST.

Necesito desarrollar una Single Page Application (SPA) para la gestión de inventario de una tienda de ropa utilizando:

- HTML5
- Tailwind CSS
- JavaScript Vanilla (ES6 Modules)
- json-server como API simulada

NO usar frameworks como React, Angular o Vue.

# Contexto

Una tienda de ropa necesita una plataforma interna para administrar sus productos.

Cada producto tendrá:

- id
- nombre
- descripción
- categoría
- talla
- precio
- stock
- fecha de creación
- responsable

El sistema tendrá dos roles:

1. Administrador
2. Vendedor

# Autenticación

Implementar:

- Login
- Logout
- Persistencia de sesión

Campos:

- email
- password

Las credenciales deben validarse contra json-server.

Implementar:

- Manejo de errores
- Mensajes informativos
- Persistencia usando localStorage

# Usuarios

No existe registro.

Los usuarios estarán precargados en db.json.

Ejemplo:

{
  "users": [
    {
      "id": 1,
      "name": "Administrador",
      "email": "admin@store.com",
      "password": "123456",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Vendedor",
      "email": "seller@store.com",
      "password": "123456",
      "role": "seller"
    }
  ]
}

# Roles

## ADMIN

Puede:

- Ver todos los productos
- Crear productos
- Editar productos
- Eliminar productos
- Consultar detalles de cualquier producto

## SELLER

Puede:

- Ver únicamente los productos bajo su responsabilidad
- Consultar detalles
- Actualizar solamente el stock disponible
- Actualizar disponibilidad

No puede:

- Crear productos
- Eliminar productos
- Modificar información general

# CRUD Productos

Crear Producto:

Campos:

- nombre
- descripción
- categoría
- talla
- precio
- stock
- responsable

Operaciones:

- GET
- POST
- PUT o PATCH
- DELETE

# Dashboard

## Administrador

Mostrar:

- Total productos
- Productos con stock disponible
- Productos agotados
- Total categorías

## Vendedor

Mostrar:

- Productos asignados
- Productos agotados
- Productos con bajo inventario

# Protección de Rutas

Implementar:

- Rutas protegidas
- Verificación de sesión
- Verificación de rol
- Redirección automática
- Logout funcional

# Comportamiento SPA

La aplicación debe:

- Navegar sin recargar la página
- Utilizar History API
- Utilizar renderizado dinámico
- Cargar vistas mediante JavaScript

# Extras

Implementar:

- Buscador por nombre
- Filtro por categoría
- Filtro por talla
- Filtro por stock
- Toast notifications
- Loader global
- Dark Mode

# Arquitectura

Generar una estructura profesional basada en módulos:

src/
│
├── api/
├── auth/
├── router/
├── views/
├── components/
├── services/
├── utils/
├── styles/
├── guards/
└── main.js

# Requisitos técnicos

Utilizar:

- ES Modules
- Fetch API
- Async/Await
- Event Delegation
- LocalStorage
- Modularización
- Manejo de errores centralizado

# Base de datos

Generar un db.json completo con:

- 2 usuarios
- 15 productos
- Diferentes categorías
- Diferentes tallas
- Diferentes estados de stock

# Entregables

Generar:

1. Arquitectura completa del proyecto
2. Árbol de carpetas
3. Configuración de json-server
4. Router SPA
5. Sistema de autenticación
6. Guards de roles
7. CRUD completo
8. Dashboard por rol
9. Código organizado por módulos
10. README completo en inglés

Aplicar buenas prácticas de Frontend y Clean Code.