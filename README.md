# 👕 StorePro - Premium Inventory Management SPA

StorePro is a high-performance Single Page Application (SPA) designed for internal clothing store management. Built with **Vanilla JavaScript (ES6+)** and **Tailwind CSS**, it features a clean, functional architecture perfect for educational purposes and professional benchmarks.

---

## 📑 Table of Contents
1. [🚀 Features](#-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [📁 Folder Structure](#-folder-structure)
4. [🚦 Getting Started](#-getting-started)
5. [🔑 Demo Credentials](#-demo-credentials)
6. [📘 Architecture & Design](#-architecture--design)
7. [🛡️ Security & Optimization](#️-security--optimization)

---

## 🚀 Features

- **Dynamic SPA Routing**: Custom-built History API router for instant page transitions.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full CRUD capabilities and global metrics.
  - **Seller**: Restricted access to assigned products and specific dashboard stats.
- **Modern UI/UX**:
  - **Dark Mode**: System-aware and persistent.
  - **Premium Design**: Rounded borders, backdrop blurs, and smooth animations.
  - **Responsive**: Fully optimized for mobile (Hamburger Menu) and desktop.
- **Real-time Feedback**: Global loader and animated toast notifications.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6 Modules).
- **Build Tool**: [Vite](https://vitejs.dev/) for ultra-fast development.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN with custom configuration).
- **Backend**: [json-server](https://github.com/typicode/json-server) (Mock REST API).

## 📁 Folder Structure

```text
root/
├── index.html          # Minimal entry point (Shell)
├── db.json             # Mock database (Users & Products)
├── vite.config.js      # Path alias (@) and server config
├── src/
│   ├── main.js         # App bootstrap & Layout skeleton
│   ├── api/            # Optimized fetch services (client.js)
│   ├── router/         # History API router logic
│   ├── views/          # Functional views (Login, Dashboard, Products)
│   ├── utils/          # Helpers (Notifications, formatting)
│   └── services/       # Auth state management
```

## 🚦 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- npm

### 2. Installation
```bash
git clone <your-repo-link>
cd clothing-store
npm install
```

### 3. Running the Project
Open two terminals:

**Terminal 1 (API):**
```bash
npm run api
```

**Terminal 2 (Vite):**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@store.com` | `123456` |
| **Seller** | `seller@store.com` | `123456` |

## 📘 Architecture & Design

### Functional over Classes
We use a **Render/Init pattern** for every view. This avoids the complexity of `this` and inheritance, making the code much easier to read:
1. `render()`: Returns the HTML string.
2. `init()`: Attaches event listeners and logic.

### Dynamic Layout Shell
The `index.html` is kept ultra-clean. The entire application shell (Header, Main, Footer) is generated dynamically in `main.js` using the `AppLayout` function.

## 🛡️ Security & Optimization

- **API Optimization**: Uses `_expand=user` and native `userId` filtering to reduce data payload and JavaScript processing.
- **Robust Error Handling**: Every endpoint is wrapped in `try/catch` with centralized HTTP response validation.
- **Navigation Control**: A centralized `navigateTo` function replaces artificial events, ensuring a predictable application flow.

---

Made with ❤️ by [DANI DOCS]
