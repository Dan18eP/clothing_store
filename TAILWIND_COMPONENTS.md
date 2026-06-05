# Tailwind Components Library

Guía rápida de componentes reutilizables para proyectos SPA con JavaScript Vanilla.

---

# Table of Contents

* [Layout](#layout)
* [Navbar](#navbar)
* [Sidebar](#sidebar)
* [Login Card](#login-card)
* [Dashboard Cards](#dashboard-cards)
* [Tables](#tables)
* [Entity Cards](#entity-cards)
* [Forms](#forms)
* [Buttons](#buttons)
* [Modals](#modals)
* [Alerts](#alerts)
* [Toasts](#toasts)
* [Loader](#loader)
* [Search & Filters](#search--filters)
* [Badges](#badges)
* [SPA Views](#spa-views)
* [Top 10 Components](#top-10-components)

---

# Layout

```html
<div class="min-h-screen flex">
  <aside class="w-64 bg-slate-900 text-white">
    Sidebar
  </aside>

  <main class="flex-1 p-6">
    Content
  </main>
</div>
```

---

# Navbar

```html
<nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
  <h1 class="font-bold text-xl">
    Inventory System
  </h1>

  <div class="flex items-center gap-4">
    <span>Admin</span>

    <button
      class="bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  </div>
</nav>
```

---

# Sidebar

```html
<aside class="w-64 bg-slate-900 text-white min-h-screen p-4">

  <h2 class="text-xl font-bold mb-6">
    Dashboard
  </h2>

  <ul class="space-y-2">

    <li>
      <a href="#" class="block p-2 rounded hover:bg-slate-700">
        Home
      </a>
    </li>

    <li>
      <a href="#" class="block p-2 rounded hover:bg-slate-700">
        Products
      </a>
    </li>

    <li>
      <a href="#" class="block p-2 rounded hover:bg-slate-700">
        Settings
      </a>
    </li>

  </ul>

</aside>
```

---

# Login Card

```html
<div class="max-w-md mx-auto mt-20 bg-white shadow-xl rounded-xl p-6">

  <h2 class="text-2xl font-bold mb-4">
    Login
  </h2>

  <form class="space-y-4">

    <input
      type="email"
      placeholder="Email"
      class="w-full border rounded-lg p-2"
    >

    <input
      type="password"
      placeholder="Password"
      class="w-full border rounded-lg p-2"
    >

    <button
      class="w-full bg-blue-600 text-white py-2 rounded-lg"
    >
      Login
    </button>

  </form>

</div>
```

---

# Dashboard Cards

```html
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

  <div class="bg-white rounded-xl shadow p-5">
    <h3 class="text-gray-500">
      Total Products
    </h3>

    <p class="text-3xl font-bold">
      120
    </p>
  </div>

</div>
```

---

# Tables

```html
<div class="overflow-x-auto bg-white rounded-xl shadow">

  <table class="w-full">

    <thead class="bg-slate-100">

      <tr>
        <th class="p-3 text-left">Name</th>
        <th class="p-3 text-left">Status</th>
        <th class="p-3 text-left">Actions</th>
      </tr>

    </thead>

    <tbody>

      <tr class="border-t">

        <td class="p-3">
          Product 1
        </td>

        <td class="p-3">
          Active
        </td>

        <td class="p-3 flex gap-2">

          <button class="bg-yellow-500 text-white px-3 py-1 rounded">
            Edit
          </button>

          <button class="bg-red-600 text-white px-3 py-1 rounded">
            Delete
          </button>

        </td>

      </tr>

    </tbody>

  </table>

</div>
```

---

# Entity Cards

```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

  <div class="bg-white shadow rounded-xl p-4">

    <h3 class="font-bold text-lg">
      Product Name
    </h3>

    <p class="text-gray-600">
      Description
    </p>

  </div>

</div>
```

---

# Forms

## Input

```html
<div>

  <label class="block mb-1">
    Name
  </label>

  <input
    class="w-full border rounded-lg p-2"
  >

</div>
```

## Select

```html
<select
  class="w-full border rounded-lg p-2"
>
  <option>Option</option>
</select>
```

## Textarea

```html
<textarea
  rows="4"
  class="w-full border rounded-lg p-2"
></textarea>
```

## Form Container

```html
<form class="space-y-4">
</form>
```

---

# Buttons

## Primary

```html
<button
  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  Save
</button>
```

## Secondary

```html
<button
  class="bg-gray-300 px-4 py-2 rounded-lg"
>
  Cancel
</button>
```

## Danger

```html
<button
  class="bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>
```

---

# Modals

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center">

  <div class="bg-white rounded-xl p-6 w-full max-w-md">

    <h2 class="text-xl font-bold">
      Confirm Action
    </h2>

  </div>

</div>
```

---

# Alerts

## Success

```html
<div
  class="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg"
>
  Success
</div>
```

## Error

```html
<div
  class="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg"
>
  Error
</div>
```

---

# Toasts

```html
<div
  class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg"
>
  Saved Successfully
</div>
```

---

# Loader

```html
<div class="flex justify-center items-center">

  <div
    class="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"
  ></div>

</div>
```

---

# Search & Filters

## Search Input

```html
<input
  type="text"
  placeholder="Search..."
  class="w-full border rounded-lg p-2"
>
```

## Filters

```html
<div class="flex flex-wrap gap-2">

  <select class="border rounded-lg p-2">
    <option>Status</option>
  </select>

  <select class="border rounded-lg p-2">
    <option>Category</option>
  </select>

</div>
```

---

# Badges

## Success

```html
<span
  class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
>
  Active
</span>
```

## Warning

```html
<span
  class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm"
>
  Pending
</span>
```

## Danger

```html
<span
  class="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
>
  Inactive
</span>
```

---

# SPA Views

## 404

```html
<section class="text-center py-20">

  <h1 class="text-5xl font-bold">
    404
  </h1>

  <p>
    Page Not Found
  </p>

</section>
```

## 403

```html
<section class="text-center py-20">

  <h1 class="text-5xl font-bold">
    403
  </h1>

  <p>
    Access Denied
  </p>

</section>
```

## Empty State

```html
<div class="text-center py-10">

  <h2 class="text-xl font-semibold">
    No Records Found
  </h2>

</div>
```

---

# Top 10 Components

Si tienes poco tiempo durante la prueba, prepara primero:

1. Login Card
2. Navbar
3. Sidebar
4. Dashboard Card
5. Data Table
6. Entity Card
7. Form Container
8. Modal
9. Toast
10. Search & Filters

Con estos 10 componentes puedes construir más del 80% de cualquier SPA CRUD con autenticación, roles y dashboard.
